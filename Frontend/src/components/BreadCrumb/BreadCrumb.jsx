import React from "react";
import "./BreadCrumb.css";
import { Link } from "react-router-dom";
const BreadCrumb = (props) => {
  const { title } = props;
  return (
    <>
      <div className="breadcrumb">
        <div className="bread-container-01">
          <div className="bread-row-01">
            <div className="bread-coloum-01">
              <p>
                <Link className="bread-link-01" to="/">Home &nbsp; </Link>
               / {title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadCrumb;
