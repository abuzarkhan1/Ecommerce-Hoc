import React, { useEffect, useState } from "react";
import "./SingleProduct.css";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ProductCard from "../../components/ProductCard/ProductCard";
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from "react-image-zoom";
import Color from "../../components/Color/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addRating,
  getAProduct,
  getAllProducts,
} from "../../features/product/productSlice";
import watchtwo from "../../images/ano.jpg";
import { toast } from "react-toastify";
import { addProdToCart, getUserCart } from "../../features/user/userSlice";
import Size from "../../components/Size/Size";

const SingleProduct = () => {
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);

  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [popularProduct, setPopularProduct] = useState([]);

  const location = useLocation();
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productState = useSelector((state) => state?.product?.singleproduct);
  const productsState = useSelector((state) => state?.product?.product);
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getUserCart());
    dispatch(getAllProducts());
  }, []);
  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, []);

  const uploadCart = () => {
   if (color === null) {
      toast.error("Please Choose Color");
      return false;
    } else {
      dispatch(
        addProdToCart({
          productId: productState?._id,
          quantity,
          color,
          size ,
          price: productState?.price,
        })
      );
      setTimeout(() => {
        navigate("/cart", { state: { selectedSize: size } });
      },300);
    }
  };

  const props = {
    width: 350,
    height: 500,
    zoomWidth: 600,
    img: productState?.images[0]?.url ? productState?.images[0]?.url : watchtwo,
  };
  const [orderedProduct, setorderedProduct] = useState(true);
  const copyToClipboard = (text) => {
    var textFeild = document.createElement("textarea");
    textFeild.innerText = text;
    document.body.appendChild(textFeild);
    textFeild.select();
    document.execCommand("copy");
    textFeild.remove();
  };
  useEffect(() => {
    let data = [];
    for (let index = 0; index < productsState?.length; index++) {
      const element = productsState[index];
      if (element?.tags === "popular") {
        data.push(element);
      }
      setPopularProduct(data);
    }
  }, [productState]);

  const addRatingToProduct = () => {
    if (star === null) {
      toast.error("Please add star Rating");
      return false;
    } else if (comment === null) {
      toast.error("Please write Review");
      return false;
    } else {
      dispatch(
        addRating({
          star: star,
          comment: comment,
          prodId: getProductId,
        })
      );
      setTimeout(() => {
        dispatch(getAProduct(getProductId));
      }, 100);
    }
    return false;
  };

  return (
    <>
      <Meta title={productState?.title} />
      <BreadCrumb title={productState?.title} />
      <div className="main-product-wrapper home-wrapper-02">
        <div className="main-product-container-01">
          <div className="main-product-row-01">
            <div className="main-product-coloum-01">
              <div className="main-product-image">
                <div>
                  <ReactImageZoom {...props} />
                </div>
              </div>
              <div className="other-product-images">
                {productState?.images.map((item, index) => {
                  return (
                    <div key={index}>
                      <img
                        style={{ maxWidth: "100%", height: "auto" }}
                        src={item?.url}
                        alt="watch"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="main-product-coloum-02">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className="title">{productState?.title}</h3>
                </div>
                <div
                  style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                  className="border-bottom"
                >
                  <p className="price-product">$ {productState?.price}</p>
                  <div className="main-product-div-01">
                    <ReactStars
                      count={5}
                      size={24}
                      value={productState?.totalrating?.toString()}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                  <a className="review-btn" href="#review">
                    Write a Review
                  </a>
                </div>
                <div
                  style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                  className="border-bottom"
                >
                  <div className="main-product-div-02">
                    <h3 className="product-heading">Type :</h3>
                    <p className="product-data">Watch</p>
                  </div>
                  <div className="main-product-div-02">
                    <h3 className="product-heading">Brand :</h3>
                    <p className="product-data">{productState?.brand}</p>
                  </div>
                  <div className="main-product-div-02">
                    <h3 className="product-heading">Category :</h3>
                    <p className="product-data">{productState?.category}</p>
                  </div>
                  <div className="main-product-div-02">
                    <h3 className="product-heading">Tags :</h3>
                    <p className="product-data">{productState?.tags}</p>
                  </div>
                  <div className="main-product-div-02">
                    <h3 className="product-heading">Availability :</h3>
                    <p className="product-data">In Stock</p>
                  </div>
                  
                      <Size setSize={setSize}  sizeData={productState?.size} />

                  {alreadyAdded === false && (
                    <>
                      <div className="main-product-div-05">
                        <h3 className="product-heading">Color :</h3>
                        <Color
                          setColor={setColor}
                          colorData={productState?.color}
                        />
                      </div>
                    </>
                  )}
                  <div className="main-product-div-06">
                    {alreadyAdded === false && (
                      <>
                        <h3 className="product-heading">Quantity :</h3>
                        <div className="">
                          <input
                            type="number"
                            className="form-control-main"
                            name=""
                            min={1}
                            max={10}
                            style={{ width: "60px" }}
                            id=""
                            onChange={(e) => setQuantity(e.target.value)}
                            value={quantity}
                          />
                        </div>
                      </>
                    )}
                    <div
                      className={
                        alreadyAdded
                          ? "addedmarginzero"
                          : "addedmarginfive" + "main-product-div-07"
                      }
                    >
                      <button
                        style={{ border: "0" }}
                        className="button"
                        type="button"
                        onClick={() => {
                          alreadyAdded ? navigate("/cart") : uploadCart();
                        }}
                      >
                        {alreadyAdded ? "Go To Cart" : "Add To Cart"}
                      </button>
                    </div>
                  </div>
                  <div className="main-product-div-08">
                    <div>
                      <a className="main-product-link-02" href="">
                        <TbGitCompare className="main-icons-01" />
                        Add to compare
                      </a>
                    </div>
                    <div>
                      <a className="main-product-link-02" href="">
                        <AiOutlineHeart className="main-icons-01" />
                        Add to Wishlist
                      </a>
                    </div>
                  </div>
                  <div className="main-product-div-09">
                    <h3 className="product-heading">Shipping & Returns :</h3>
                    <p className="product-data">
                      Free shipping and returns available on all orders! <br />{" "}
                      We ship all US domestic orders within{" "}
                      <b> 5-10 business days!</b>
                    </p>
                  </div>
                  <div className="main-product-div-02">
                    <h3 className="product-heading">Product Link:</h3>
                    <a
                      href="javascript:void(0)"
                      onClick={() => {
                        copyToClipboard(window.location.href);
                      }}
                    >
                      Copy Product Link
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="single-description-wrapper home-wrapper-02">
        <div className="single-description-container-01">
          <div className="single-description-row-01">
            <div className="single-description-coloum-01">
              <h4>Description</h4>
              <div className="single-description-div-01">
                <p
                  dangerouslySetInnerHTML={{
                    __html: productState?.description,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section id="review" className="reviews-wrapper home-wrapper-02">
        <div className="review-container-01 ">
          <div className="review-row-o1">
            <div className="review-coloum-01">
              <h3>Reviews</h3>
              <div className="review-inner-wrapper">
                <div className="review-head">
                  <div>
                    <h4>Customer Reviews</h4>
                    <div className="review-div-01">
                      <ReactStars
                        count={5}
                        size={24}
                        value={5}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                  </div>
                  {orderedProduct && (
                    <div>
                      <a className="review-link" href="">
                        Write a Review
                      </a>
                    </div>
                  )}
                </div>
                <div className="review-form">
                  <h4>Write A Review</h4>
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={3}
                      edit={true}
                      activeColor="#ffd700"
                      onChange={(e) => setStar(e)}
                    />
                  </div>
                  <div>
                    <textarea
                      className="review-form-control-contact"
                      style={{ width: "100%" }}
                      name=""
                      id=""
                      cols="30"
                      rows="3"
                      placeholder="Comments"
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="review-div-02">
                    <button
                      style={{ marginTop: "20px" }}
                      onClick={addRatingToProduct}
                      className="button"
                      type="button"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
                <div className="reviews">
                  <div className="review">
                    {productState &&
                      productState?.ratings?.map((item, index) => {
                        return (
                          <>
                            <div key={index} className="review-div-03">
                              <h4 style={{ marginTop: "2.3px" }}>Abuzar</h4>
                              <ReactStars
                                count={5}
                                size={24}
                                value={item?.star}
                                edit={false}
                                activeColor="#ffd700"
                              />
                            </div>
                            <p>{item?.comment}</p>
                          </>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="single-product-popular-wrapper home-wrapper-02"
        style={{ paddingTop: 48, paddingBottom: 48 }}
      >
        <div className="single-product-container-01">
          <div className="single-product-row-01">
            <div className="single-product-coloum-01">
              <h3 className="section-heading">Our Popular Products</h3>
            </div>
          </div>
          <div className="single-product-row-two-01">
            <ProductCard data={popularProduct} />
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
