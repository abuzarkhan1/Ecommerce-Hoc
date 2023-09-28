import React from "react";
import "./BlogCard.css";
import { Link } from "react-router-dom";
import blog from "../../images/blog-1.jpg";
const BlogCard = (props) => {
  const { id, title, description, date, image } = props;
  return (
    <div className="blog-card">
      <div className="card-image">
        <img src={image ? image : blog} className="blog-img" alt="blog" />
      </div>
      <div className="blog-content">
        <p className="date">{date}</p>
        <h5 className="title">{title}</h5>
        <p
          className="desc"
          dangerouslySetInnerHTML={{ __html:description?.substr(0, 70) + "..." }}
        ></p>
        <Link style={{ marginTop: 20 }} to={"/blog/" + id} className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
