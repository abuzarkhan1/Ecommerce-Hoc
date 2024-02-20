import React, { useEffect, useState } from "react";
import "./AddProduct.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../../features/brand/brandSlice";
import { getCategories } from "../../../features/pcategory/pcategorySlice";
import { getColors } from "../../../features/color/colorSlice";
import { delImg, uploadImg } from "../../../features/upload/uploadSlice";
import { FcUpload } from "react-icons/fc";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { createProducts, getSingleProduct, updateAProduct, resetState } from "../../../features/product/productSlice";
import { getSizes } from "../../../features/size/sizeSlice";
import { useParams } from "react-router-dom";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  price: Yup.number().required("Price is Required"),
  brand: Yup.string().required("Brand is Required"),
  category: Yup.string().required("Category is Required"),
  tags: Yup.string().required("Tag is Required"),
  color: Yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  quantity: Yup.number().required("Quantity is Required"),
});

const AddProduct = () => {
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
    dispatch(getSizes());
    if (productId) {
      dispatch(getSingleProduct(productId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, productId]);

  const brandState = useSelector((state) => state?.brand?.brands);
  const catState = useSelector((state) => state?.pCategory?.pCategories);
  const colorState = useSelector((state) => state?.color?.colors);
  const sizeState = useSelector((state) => state?.size?.sizes);
  const imgState = useSelector((state) => state?.upload?.images);
  const newProduct = useSelector((state) => state?.product);
  const { isSuccess, isError, isLoading, createdProduct, updateAProduct: updateProductStatus } = newProduct;

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfully!");
    }
    if (isSuccess && updateProductStatus) {
      toast.success("Product Updated Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdProduct, updateProductStatus]);

  useEffect(() => {
    formik.values.color = color;
    formik.values.images = images;
  }, [color, images]);

  const sizeopt = sizeState.map((i) => ({
    label: i.title,
    value: i._id,
  }));

  const coloropt = colorState.map((i) => ({
    label: i.title,
    value: i._id,
  }));

  const img = imgState.map((i) => ({
    public_id: i.public_id,
    url: i.url,
  }));

  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.size = size ? size : " ";
    formik.values.images = img;
  }, [color, img, size]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: "",
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (productId) {
        // Edit product
        dispatch(updateAProduct({ productId: productId, updatedProduct: values }));
      } else {
        // Add product
        dispatch(createProducts(values));
      }
      formik.resetForm();
      setColor([]);
      setSize([]);
      setTimeout(() => {
        dispatch(resetState());
      }, 1000);
    },
  });

  const handleSizes = (e) => {
    setSize(e);
  };

  const handleColors = (e) => {
    setColor(e);
  };
  return (
    <div>
    <h3 className="adp-h3">{productId ? "Edit" : "Add"} Product</h3>
      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="form-addproduct"
        >
          <CustomInput
            i_class="long-6"
            type="text"
            label="Enter Product Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleChange("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div>
            <ReactQuill
              className="quill-1"
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <Select
            mode="multiple"
            name="size"
            allowClear
            className="add-select"
            placeholder="Select Size"
            defaultValue={size}
            onChange={handleSizes}
            options={sizeopt}
          />
          <CustomInput
            i_class="long-7"
            type="number"
            label="Enter Product Price"
            name="price"
            onChng={formik.handleChange("price")}
            onBlr={formik.handleChange("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            className="select-1"
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleChange("brand")}
            value={formik.values.brand}
            id=""
          >
            <option>Select Brand</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleChange("category")}
            value={formik.values.category}
            className="select-1"
            id=""
          >
            <option value="">Select Category</option>
            {catState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <select
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleChange("tags")}
            value={formik.values.tags}
            className="select-1"
            id=""
          >
            <option value="" disabled>Tags</option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
           
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>
          <Select
            mode="multiple"
            allowClear
            className="add-select"
            placeholder="Select colors"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
            options={coloropt}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
          <CustomInput
            i_class="long-7"
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            onChng={formik.handleChange("quantity")}
            onBlr={formik.handleChange("quantity")}
            val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="addProduct-div-01">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <FcUpload />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages">
            {imgState.map((i, j) => {
              return (
                <div className="addProd-div-2" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="close-button"
                  >
                  <img src={i.url} alt="" width={300} height={250} />
                  </button>
                </div>
              );
            })}
          </div>
          <button className="adp-btn" type="submit">
          {productId ? "Edit" : "Add"} Product
        </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
