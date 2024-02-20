import React from "react";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import "./ResetPassword.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../features/user/userSlice";

const resetSchema = yup.object({
  password: yup.string().required("Password is required"),
});

const ResetPassword = () => {
  const location = useLocation();
  const getToken = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: resetSchema,
    onSubmit: (values) => {
      dispatch(resetPassword({
        token:getToken,
        password:values.password
      }))
      navigate("/login")
    },
  });
  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />
      <div className="reset-wrapper home-wrapper-02">
        <div className="reset-container-01">
          <div className="reset-row-01">
            <div className="reset-coloum-01">
              <div className="auth-card">
                <h3 className="reset-h3-01">Reset Password</h3>
                <form
                 onSubmit={formik.handleSubmit}
                  action=""
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  <div className="login-div-02">
                    <input
                      type="password"
                      name="password"
                      Placeholder="Password"
                      className="form-control "
                      value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                  />
                  <div className='error'>
                  {formik.touched.password && formik.errors.password}
                  </div>
                  </div>
                  <div>
                    <div className="reset-div-01">
                      <button style={{ border: "0" }} className="button">
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
