import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Meta from "../../components/Meta/Meta";
import "./OurStore.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import gr1 from "../../images/gr.svg";
import gr2 from "../../images/gr2.svg";
import gr3 from "../../images/gr3.svg";
import gr4 from "../../images/gr4.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../features/product/productSlice";
import { getColors } from "../../features/colors/colorSlice";
import { useLocation } from "react-router-dom";

const OurStore = () => {
  const [grid, setGrid] = useState(4);
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  let categoryParam = query.get("category");

  const productState = useSelector((state) => state?.product?.product);
  const catState = useSelector((state) => state?.pCategory?.pCategories);
  const colorState = useSelector((state) => state?.color?.colors);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");


  const [tag, setTag] = useState(null);
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);
  const [filtersChanged, setFiltersChanged] = useState(false);
  const [catFomFilter, setCatFomFilter] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!filtersChanged) {
      getProducts();
    }
    dispatch(getColors());

    let newBrands = [];
    let newCategories = [];
    let newTags = [];

    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      newBrands.push(element?.brand);
      newTags.push(element?.tags);
    }

    for (let index = 0; index < catState?.length; index++) {
      const element = catState[index];
      console.log(JSON.stringify(element));
      newCategories.push(element?.title);
    }

    setBrands([...new Set(newBrands)]);
    setCategories([...new Set(newCategories)]);
    setTags([...new Set(newTags)]);
  }, []);

  useEffect(() => {
    if (selectedColor) {
      getProducts();
      setFiltersChanged(true);
    } else {
      setFiltersChanged(false);
    }
  }, [selectedColor, productState]);

  useEffect(() => {
    // Call getProducts function to fetch the initial products
    getProducts();
    if (categoryParam && !catFomFilter) {
      setCategory(categoryParam);
      setFiltersChanged(true);
    }else{
      setFiltersChanged(false);
      setCatFomFilter(false);
    }
  }, [sort, tag, brand, category, minPrice, maxPrice, location.search]);



  const handleColorChange = (colorId) => {
    setSelectedColor(colorId);
  };

  const handleCategoryClick = (categoryName) => {
    setCatFomFilter(true);
    setFiltersChanged(true);
    setCategory(categoryName);
  };

  const getProducts = () => {
    dispatch(
      getAllProducts({
        sort,
        tag,
        brand,
        category,
        minPrice,
        maxPrice,
        color: selectedColor,
      })
    );
    // Reset filtersChanged to false after fetching products
    setFiltersChanged(false);
  };


  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <div
        className="store-wrapper home-wrapper-02"
        style={{ paddingTop: 48, paddingBottom: 48 }}
      >
        <div className="store-container-01">
          <div className="store-row-01">
            <div className="store-coloum-01">
              <div className="filter-card">
                <h3 className="filter-title">Shop By Categories</h3>
                <div>
                  <ul style={{ paddingLeft: 0 }}>
                    {categories &&
                      [...new Set(categories)]?.map((item, index) => {
                        return (
                          <li
                            key={index}
                            className={"active"}
                            onClick={() => handleCategoryClick(item)}
                          >
                            {item}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div className="filter-card-filter">
                <h3 className="filter-title">Filter By</h3>
                <div>
                  <h5 className="sub-title">Price</h5>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingInput"
                        placeholder="From"
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                    </div>
                    <div>
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id="floatingInput"
                          placeholder="To"
                          onChange={(e) => setMaxPrice(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-card">
                <h3 className="filter-title">Product Tags</h3>
                <div>
                  <div className="product-tags">
                    {tags &&
                      [...new Set(tags)]?.map((item, index) => {
                        return (
                          <span
                            onClick={() => setTag(item)}
                            key={index}
                            className="store-badge-01"
                          >
                            {item}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="filter-card">
                <h3 className="filter-title">Product Brands</h3>
                <div>
                  <div className="product-tags">
                    {brands &&
                      [...new Set(brands)]?.map((item, index) => {
                        return (
                          <span
                            onClick={() => setBrand(item)}
                            key={index}
                            className="store-badge-01"
                          >
                            {item}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="filter-card">
                <h3 className="filter-title">Colors</h3>
                <div>
                  <div className="product-tags">
                    {colorState &&
                      colorState?.map((item, index) => (
                        <li
                          style={{ backgroundColor: item?.title , "cursor":"pointer" }}
                          onClick={() => handleColorChange(item?._id)}
                          key={index}
                          className={`store-badge-01 ${
                            item?._id === selectedColor ? selectedColor : ""
                          }`}
                        ></li>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="store-coloum-02">
              <div className="filter-sort-grid">
                <div className="store-div-003">
                  <div className="store-div-004">
                    <p className="store-p-001">Sort By:</p>
                    <select
                      className="form-control form-selects"
                      name=""
                      id=""
                      onChange={(e) => setSort(e?.target?.value)}
                      style={{ display: window.innerWidth <= 768 ? "none" : "block" }}
                    >
                      <option value="title">Alphabetically, A-Z</option>
                      <option value="-title">Alphabetically, Z-A</option>
                      <option value="price">Price, low to high</option>
                      <option value="-price">Price, high to low</option>
                      <option value="createdAt">Date, old to new</option>
                      <option value="-createdAt">Date, new to old</option>
                    </select>
                  </div>
                  <div className="store-div-005">
                    <p className="total-products">
                      Total Products {productState && productState?.length}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                      className="grid"
                    >
                      <img
                        onClick={() => {
                          setGrid(3);
                        }}
                        className="store-img-001"
                        src={gr4}
                        alt="grid"
                      />
                      <img
                        onClick={() => {
                          setGrid(4);
                        }}
                        className="store-img-001"
                        src={gr3}
                        alt="grid"
                      />
                      <img
                        onClick={() => {
                          setGrid(6);
                        }}
                        className="store-img-001"
                        src={gr2}
                        alt="grid"
                      />
                      <img
                        onClick={() => {
                          setGrid(12);
                        }}
                        className="store-img-001"
                        src={gr1}
                        alt="grid"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="products-list">
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <ProductCard
                    data={productState ? productState : []}
                    grid={grid}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStore;
