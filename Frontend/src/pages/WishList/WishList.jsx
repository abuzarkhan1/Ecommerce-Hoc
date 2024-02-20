import React, { useEffect } from "react";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import cross from "../../images/cross.svg";
import watch from "../../images/watch.jpg";
import "./WishList.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../../features/user/userSlice";
import { addToWishlist } from "../../features/product/productSlice";

const WishList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getWishlistFromDb();
  }, []);
  const getWishlistFromDb = () => {
    dispatch(getUserProductWishlist());
  };
  const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);
  const removeFromWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 1000);
  };
  return (
    <>
      <Meta title={"WishList"} />
      <BreadCrumb title="WishList" />
      <div className="wishlist-wrapper home-wrapper-02">
        <div className="wish-container-01">
          <div className="wish-row-01">
          {wishlistState?.length === 0 && (
            <div style={{"fontSize":"23px","marginLeft":"640px"}}>No Data</div>
          )}
            {wishlistState && wishlistState?.map((item, index) => {
              return (
                <div className="wish-coloum-01" key={index}>
                  <div
                    className="wishlist-card"
                    style={{ position: "relative" }}
                  >
                    <img
                      onClick={() => {
                        removeFromWishlist(item?._id);
                      }}
                      style={{
                        position: "absolute",
                        maxWidth: "100%",
                        height: "auto",
                      }}
                      className="cross"
                      src={cross}
                      alt="cross"
                    />
                    <div className="wishlist-card-image">
                      <img
                        src={item?.images[0].url ? item?.images[0].url : watch}
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          width: "100%",
                        }}
                        alt="watch"
                      />
                    </div>
                    <div className="wish-div-01">
                      <h5 className="wish-title">{item?.title}</h5>
                      <hr />
                      <h6 className="wish-price">$ {item?.price}</h6>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;
