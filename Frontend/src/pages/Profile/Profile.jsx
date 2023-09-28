import React, { useState } from "react";
import "./Profile.css";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Meta from "../../components/Meta/Meta";
import { useFormik } from 'formik';
import * as yup from "yup";
import {useDispatch,useSelector} from "react-redux"
import { updateProfile } from "../../features/user/userSlice";
import {FiEdit} from "react-icons/fi"



const profileSchema = yup.object({
    firstname: yup.string().required("First Name is required"), 
    lastname: yup.string().required("Last Name is required"), 
    email: yup.string().email().required("Email Address is required"),
    mobile: yup.number().required("Mobile Number is required"),

  })

 


const Profile = () => {

  const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

 const config2 = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};


    const dispatch = useDispatch();
    const userState = useSelector((state)=>state?.auth?.user);
    const [edit , setEdit] = useState(true)
    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
          firstname: userState?.firstname,
          lastname:userState?.lastname,
          email:userState?.email,
          mobile:userState?.mobile,
        },
        validationSchema:profileSchema,
        onSubmit:(values) => {
            dispatch(updateProfile({data:values,config2:config2}))
            setEdit(true)
        },
      });
  return (
    <>
      <Meta title="Profile"/>
      <BreadCrumb title="Profile" />
      <div className="profile-page home-wrapper-02">
        <div className="profile-page-container-1">
          <div className="profile-page-row-1">
          <div className="profile-coloum-2">
            <div className="profile-div-1">
                <h2>Update Profile</h2>
                <FiEdit className="edit-b" onClick={()=>setEdit(false)}/>
            </div>
          </div>
            <div className="profile-page-coloum-1">
              <form onSubmit={formik.handleSubmit}>
                <div className="my-form-group">
                  <label htmlFor="example1" className="my-form-label">
                    First Name
                  </label>
                  <input
                    type="tect"
                    className="my-form-control"
                    id="example1"
                    name="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange("firstname")}
                    onBlur={formik.handleBlur("firstname")}
                    disabled={edit}
                  />
                  <div className='error'>
                  {formik.touched.firstname && formik.errors.firstname}
                  </div>
                </div>
                <div className="my-form-group">
                  <label htmlFor="example2" className="my-form-label">
                    Last Name
                  </label>
                  <input
                    type="tect"
                    className="my-form-control"
                    id="example2"
                    name="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur("lastname")}
                    disabled={edit}
                  />
                  <div className='error'>
                  {formik.touched.lastname && formik.errors.lastname}
                  </div>
                </div>
                <div className="my-form-group">
                  <label htmlFor="exampleInputEmail1" className="my-form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="my-form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    disabled={edit}
                  />
                  <div className='error'>
                  {formik.touched.email && formik.errors.email}
                  </div>
                </div>
                <div className="my-form-group">
                  <label htmlFor="exampleInputEmail2" className="my-form-label">
                    Mobile Number
                  </label>
                  <input
                    type="number"
                    className="my-form-control"
                    id="exampleInputEmail2"
                    aria-describedby="emailHelp"
                    name="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                    disabled={edit}
                  />
                  <div className='error'>
                  {formik.touched.mobile && formik.errors.mobile}
                  </div>
                </div>
                {
                    edit === false &&  <button type="submit" className="button">
                  Save
                </button>
                }
               
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
