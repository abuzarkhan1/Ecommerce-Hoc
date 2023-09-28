import React from "react";
import "./CompareProduct.css";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Color from "../../components/Color/Color";
import cross from "../../images/cross.svg";
import watch from "../../images/watch.jpg"
const CompareProduct = () => {
  return (
    <>
      <Meta title={"Compare Products"} />
      <BreadCrumb title="Compare Products" />
      <div className="compare-product-wrapper home-wrapper-02">
        <div className="compare-container-01">
          <div className="compare-row-01">
            <div className="compare-coloum-01">
              <div className="compare-product-card">
              <img
              className="cross"
              style={{"position":"absolute","maxWidth":"100%","height":"auto"}}
               src={cross} alt="cross" />
                <div className="compare-product-card-image">
                  <img src={watch} alt="watch" />
                </div>
                <div className="compare-product-details">
                <h5 className="title">
                    Honor T1 7.0. 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi+3G Tablet
                </h5>
                <h6 className="compare-price">$100</h6>
                <div>
                    <div className="product-detail">
                        <h5>Brand:</h5>
                        <p>Havels</p>
                    </div>
                    <div className="product-detail">
                        <h5>Type:</h5>
                        <p>Watch</p>
                    </div>
                    <div className="product-detail">
                        <h5>Availaibility:</h5>
                        <p>In Stock</p>
                    </div>
                    <div className="product-detail">
                        <h5>Color:</h5>
                        <Color /> 
                    </div>
                    <div className="product-detail">
                        <h5>Size :</h5>
                     <div 
                     style={{"display":"flex","gap":"10px"}}
                     >  
                        <p>S</p>
                        <p>M</p>
                     </div>
                    </div>
                </div>
                </div>
              </div>
            </div>
            <div className="compare-coloum-01">
              <div className="compare-product-card">
              <img
              className="cross"
              style={{"position":"absolute","maxWidth":"100%","height":"auto"}}
               src={cross} alt="cross" />
                <div className="compare-product-card-image">
                  <img src={watch} alt="watch" />
                </div>
                <div className="compare-product-details">
                <h5 className="title">
                    Honor T1 7.0. 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi+3G Tablet
                </h5>
                <h6 className="compare-price">$100</h6>
                <div>
                    <div className="product-detail">
                        <h5>Brand:</h5>
                        <p>Havels</p>
                    </div>
                    <div className="product-detail">
                        <h5>Type:</h5>
                        <p>Watch</p>
                    </div>
                    <div className="product-detail">
                        <h5>Availaibility:</h5>
                        <p>In Stock</p>
                    </div>
                    <div className="product-detail">
                        <h5>Color:</h5>
                        <Color /> 
                    </div>
                    <div className="product-detail">
                        <h5>Size :</h5>
                     <div 
                     style={{"display":"flex","gap":"10px"}}
                     >  
                        <p>S</p>
                        <p>M</p>
                     </div>
                    </div>
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

export default CompareProduct;
