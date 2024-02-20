import React, { useEffect } from "react";
import "./AddSize.css";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createSize,
  getASize,
  updateASize,
  resetState,
} from "../../features/size/sizeSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Size is Required"),
});
const AddSize = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getSizeId = location.pathname.split("/")[3];
  const newSize = useSelector((state) => state?.size);
  const {
    isSuccess,
    isError,
    isLoading,
    createdSize,
    updatedSize,
    sizeName,
  } = newSize;

  useEffect(() => {
    if (getSizeId !== undefined) {
      dispatch(getASize(getSizeId));
    } else {
      dispatch(resetState());
    }
  }, [getSizeId]);

  useEffect(() => {
    if (isSuccess && createdSize) {
      toast.success("Size Added Successfullly!");
    }
    if (isSuccess && updatedSize) {
      toast.success("Size Updated Successfullly!");
      navigate("/admin/size-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: sizeName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getSizeId !== undefined) {
        const data = { id: getSizeId, sizeData: values };
        dispatch(updateASize(data));
        dispatch(resetState());
      } else {
        dispatch(createSize(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="adc-h3">
        {getSizeId !== undefined ? "Edit" : "Add"} Size
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            i_class="long-3"
            label="Enter Product Size"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="color"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className="adc-btn" type="Submit">
            {getSizeId !== undefined ? "Edit" : "Add"} Size
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSize;
