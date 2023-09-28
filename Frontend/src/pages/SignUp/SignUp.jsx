import React, { useEffect } from 'react'
import "./SignUp.css"
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import { useFormik } from 'formik';
import * as yup from "yup"
import {useDispatch, useSelector} from "react-redux"
import { registerUser } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const signupSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  email: yup.string().email().required("Email Address is required"),
  mobile: yup.number().required("Mobile No is required"),
  password: yup.string().required("Password is required"), 
})

const SignUp = () => {
  const authState = useSelector((state)=>state?.auth)
const dispatch = useDispatch();
const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      mobile:"",
      password:"",
    },
    validationSchema:signupSchema,
    onSubmit: values => {
      dispatch(registerUser(values))
    },
  });

  return (
    <>
    <Meta title={"Create Account"} />
      <BreadCrumb title="Create Account" />
    <div className="signup-wrapper home-wrapper-02">
       <div className='signup-container-01'>
       <div className="signup-row-01">
          <div className="signup-coloum-01">
            <div className="auth-card">
              <h3 className="signup-h3-01">Create Account</h3>
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
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    className="form-control"
                    value={formik.values.firstname}
                    onChange={formik.handleChange("firstname")}
                    onBlur={formik.handleBlur("firstname")}
                  />
                  <div className='error'>
                  {formik.touched.firstname && formik.errors.firstname}
                  </div>
                </div>
                <div className="login-div-02">
                  <input
                    type="text"
                    name="lastname"
                    Placeholder="Last Name"
                    className="form-control "
                    value={formik.values.lastname}
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur("lastname")}
                  />
                  <div className='error'>
                  {formik.touched.lastname && formik.errors.lastname}
                  </div>
                </div>
                <div className="login-div-02">
                  <input
                    type="email"
                    name="email"
                    Placeholder="Email"
                    className="form-control "
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                  <div className='error'>
                  {formik.touched.email && formik.errors.email}
                  </div>
                </div>
                <div className="login-div-02">
                  <input
                    type="tel"
                    name="mobile"
                    Placeholder="Mobile"
                    className="form-control "
                    value={formik.values.mobile}
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                  />
                  <div className='error'>
                  {formik.touched.mobile && formik.errors.mobile}
                  </div>
                </div>
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
                  <div className="signup-div-01">
                    <button style={{ border: "0" }} className="button">
                      Create
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
  )
}

export default SignUp;