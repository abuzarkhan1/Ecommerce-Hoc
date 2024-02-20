import React from "react";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import "./Contact.css";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiInfoCircle, BiPhoneCall } from "react-icons/bi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {createQuery} from "../../features/contact/contactSlice"
const contactSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email Address is required"),
  mobile: yup.number().required("Mobile is required"),
  comment: yup.string().required("Comment is required"),

});

const Contact = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(createQuery({name:values.name,email:values.email,mobile:values.mobile,comment:values.comment}))
    },
  });
  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />
      <div className="contact-wrapper home-wrapper-02">
        <div className="contact-container-01">
          <div className="contact-row-01">
            <div className="contact-coloum-01">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d504375.0653366535!2d6.858728909455021!3d9.024462455551568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e745f4cd62fd9%3A0x53bd17b4a20ea12b!2sAbuja%2C%20Federal%20Capital%20Territory%2C%20Nigeria!5e0!3m2!1sen!2s!4v1682278310599!5m2!1sen!2s"
                width="1350"
                height="450"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="contact-coloum-02">
              <div
                className="contact-inner-wrapper"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  <h3 className="contact-title">Contact Us</h3>
                  <form
                    action=""
                    onSubmit={formik.handleSubmit}
                    className="contact-form-001"
                  >
                    <div>
                      <input
                        type="text"
                        className="form-control-contact"
                        placeholder="Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange("name")}
                        onBlur={formik.handleBlur("name")}
                      />
                      <div className="error">
                        {formik.touched.name && formik.errors.name}
                      </div>
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        className="form-control-contact"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                      />
                      <div className="error">
                        {formik.touched.email && formik.errors.email}
                      </div>
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="mobile"
                        className="form-control-contact"
                        placeholder="Mobile Number"
                        value={formik.values.mobile}
                        onChange={formik.handleChange("mobile")}
                        onBlur={formik.handleBlur("mobile")}
                      />
                      <div className="error">
                        {formik.touched.mobile && formik.errors.mobile}
                      </div>
                    </div>
                    <div>
                      <textarea
                        className="form-control-contact"
                        style={{ width: "100%" }}
                        name="comment"
                        id=""
                        cols="30"
                        rows="5"
                        placeholder="Comments"
                        value={formik.values.comment}
                        onChange={formik.handleChange("comment")}
                        onBlur={formik.handleBlur("comment")}
                       />
                        <div className="error">
                          {formik.touched.comment && formik.errors.comment}
                        </div>
                    </div>
                    <div>
                      <button className="button">Submit</button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className="contact-title">Get in Touch with Us</h3>
                  <div>
                    <ul style={{ paddingLeft: "0" }}>
                      <li
                        style={{
                          marginBottom: "1rem",
                          display: "flex",
                          gap: "15px",
                          alignItems: "center",
                        }}
                      >
                        <AiOutlineHome style={{ fontSize: "1.25rem" }} />
                        <address>
                          Something is the address 203821 Nigeria
                        </address>
                      </li>
                      <li
                        style={{
                          marginBottom: "1rem",
                          display: "flex",
                          gap: "15px",
                          alignItems: "center",
                        }}
                      >
                        <BiPhoneCall style={{ fontSize: "1.25rem" }} />
                        <a href="tel:+123456789">123456789</a>
                      </li>
                      <li
                        style={{
                          marginBottom: "1rem",
                          display: "flex",
                          gap: "15px",
                          alignItems: "center",
                        }}
                      >
                        <AiOutlineMail style={{ fontSize: "1.25rem" }} />
                        <a href="mailto:something@gmail.com">
                          Something@gmail.com
                        </a>
                      </li>
                      <li
                        style={{
                          marginBottom: "1rem",
                          display: "flex",
                          gap: "15px",
                          alignItems: "center",
                        }}
                      >
                        <BiInfoCircle style={{ fontSize: "1.25rem" }} />
                        <p>Monday – Friday 10 AM – 8 PM</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
