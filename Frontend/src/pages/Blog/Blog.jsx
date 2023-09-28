import React, { useEffect } from "react";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import "./Blog.css";
import BlogCard from "../../components/BlogCard/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../features/blogs/blogSlice";
import moment from "moment"

const Blog = () => {
  const blogState = useSelector((state) => state?.blog?.blog);
  console.log(blogState);
  const dispatch = useDispatch();
  useEffect(() => {
    getblogs();
  }, []);
  const getblogs = () => {
    dispatch(getAllBlogs());
  };
  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />
      <div className="blog-wrapper home-wrapper-02">
        <div className="blog-container-01">
          <div className="blog-row-01">
            <div className="blog-coloum-02">
              <div className="blog-row-01">
                {
                  blogState &&
                  blogState?.map((item, index) => {
                  return (
                    <div className="blog-coloum-03" key={index}>
                      <BlogCard
                        id={item?._id}
                        title={item?.title}
                        description={item?.description}
                        image={item?.images[0]?.url}
                        date={moment(item?.created_At).format("MMMM Do YYYY, h:mm a")}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
