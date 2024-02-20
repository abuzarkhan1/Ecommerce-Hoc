import React from 'react'
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import "./ForgotPassword.css"
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import { forgotPasswordToken } from '../../features/user/userSlice';

const emailSchema = yup.object({
  email: yup.string().email().required("Email Address is required"),
})
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema:emailSchema,
    onSubmit: (values) => {
      dispatch(forgotPasswordToken(values))
    },  
  });
  return (
    <>
        <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />
      <div className="forgot-wrapper home-wrapper-02">
      <div className='forgot-container-01'>
      <div className="forgot-row-01">
          <div className="forgot-coloum-01">
            <div className="auth-card">
              <h3 className="forgot-h3-01">Reset Your Password</h3>
              <p className='forgot-p-01'>We will send you an email to reset your password</p>
              <form
              onSubmit={formik.handleSubmit}
                action=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control "
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                  <div className='error'>
                  {formik.touched.email && formik.errors.email}
                  </div>
                </div>
                <div>
                
                  <div className="forgot-div-01">
                    <button style={{ border: "0" }} className="button" type='submit'>
                      Submit
                    </button>
                
                    <Link className="login-link-01" to="/login">Cancel</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default ForgotPassword;