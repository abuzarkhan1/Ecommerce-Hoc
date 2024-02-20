import React from "react";
import "./ProductCard.css";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import wish from "../../images/wish.svg";
import watch1 from "../../images/watch-1.jpg";
import view from "../../images/view.svg";
import {useDispatch} from "react-redux";
import {addToWishlist} from "../../features/product/productSlice"



const ProductCard = (props) => {
  const { grid , data } = props;
  let location = useLocation();
  const dispatch = useDispatch();

  const addToWish = (prodId) => {
    dispatch(addToWishlist(prodId));
  }
  return (
    <>
    {
     data?.map((item,index)=>{
      return(
          <div
          key={index}
        className={` ${
          location.pathname === "/product"
            ? `product-card-coloum-${grid}`
            : "product-card-coloum-3"
        } `}
      >
        <div 
          style={{ position: "relative" }}
          className="product-card"
        >
          <div className="wishlist-icon">
            <button className="wishlist-button" onClick={()=>{addToWish(item?._id)}}>
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <img className="img-01" src={item?.images[0]?.url} alt="product" />
          </div>
          <div className="product-details">
            <h6 className="brand">{item?.brand}</h6>
            <h5 className="product-title">
              {item.title}
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={item.totalrating.toString()}
              edit={false}
              activeColor="#ffd700"
            />
            <p
              className={`description ${
                grid === 12 ? "show-description" : "dontshow-description"
              }`}
              dangerouslySetInnerHTML={{__html: item?.description}}
            >
            </p>
            <p className="price">$ {item?.price}</p>
          </div>
          <div style={{ position: "absolute" }} className="action-bar">
            <div className="product-card-div">
              <Link to={"/product/"+item?._id}>
                <img src={view} alt="addcart" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      )
     })
    }
     
    </>
  );
};

export default ProductCard;
