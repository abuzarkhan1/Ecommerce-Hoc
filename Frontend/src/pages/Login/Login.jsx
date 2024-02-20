import React, { useEffect } from "react";
import "./Login.css";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import { loginUser } from "../../features/user/userSlice";

const loginSchema = yup.object({
  email: yup.string().email().required("Email Address is required"),
  password: yup.string().required("Password is required"), 
})


const Login = () => {
  const authState = useSelector((state)=>state?.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password:"",
    },
    validationSchema:loginSchema,
    onSubmit: values => {
      dispatch(loginUser(values))
    },
  });

  useEffect(() => {
    if(authState.user !== null && authState.isError === false){
      navigate("/")
    }
  }, [authState])
  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />
      <div className="login-wrapper home-wrapper-02">
        <div className="login-container-01">
        <div className="login-row-01">
          <div className="login-coloum-01">
            <div className="auth-card">
              <h3 className="login-h3-01">Login</h3>
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
                <div className="login-div-02">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
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
                  <Link className="login-link-01" to="/forgot-password">Forgot Your Password?</Link>
                  <div className="login-div-01">
                    <button style={{ border: "0" }} className="button" type="submit">
                      Login
                    </button>
                    <Link to="/signup" className="button signup">
                      SignUp
                    </Link>
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

export default Login;
