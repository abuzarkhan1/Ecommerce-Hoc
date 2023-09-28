import React, { useEffect } from "react";
import "./SingleBlog.css";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import { Link, useLocation } from "react-router-dom";
import blog1 from "../../images/brand-01.png";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getABlog } from "../../features/blogs/blogSlice";

const SingleBlog = () => {
  const blogState = useSelector((state) => state?.blog?.singleBlog);
  const dispatch = useDispatch();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[2];
  useEffect(() => {
    getblog();
  }, []);
  const getblog = () => {
    dispatch(getABlog(getBlogId));
  };
  return (
    <>
      <Meta title={blogState?.title} />
      <BreadCrumb title={blogState?.title} />
      <div className="single-blog-wrapper home-wrapper-02">
        <div className="single-blog-container-01">
          <div className="single-blog-row-01">
            <div className="single-blog-coloum-01">
              <div className="single-blog-card">
                <Link className="single-link-01" to="/blogs">
                  <HiOutlineArrowLeft /> Go Back to Blogs
                </Link>
                <h3 className="title">{blogState?.title}</h3>
                <img
                  className="single-blog-img"
                  src={
                    blogState?.images[0].url ? blogState?.images[0].url : blog1
                  }
                  alt="blog"
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html: blogState?.description,
                  }}
                ></p>
                <Link className="single-link-01" to="/blogs">
                  <HiOutlineArrowLeft /> Go Back to Blogs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
