import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import wishlist from "../../images/wishlist.svg";
import user from "../../images/user.svg";
import cart from "../../images/cart.svg";
import menu from "../../images/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAProduct } from "../../features/product/productSlice";
import { getCategories  } from "../../features/Pcat/PcategorySlice";




const Header = () => {
  const [totalAmount, setTotalAmount] = useState(null);
  const [paginate, setPaginate] = useState(true);
  const [productOpt, setProductOpt] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const authState = useSelector((state) => state?.auth);
  const productState = useSelector((state) => state?.product?.product);
  const pCatState = useSelector((state) => state?.pCategory?.pCategories);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum =
        sum +
        Number(cartState[index].quantity) * Number(cartState[index].price);
      setTotalAmount(sum);
    }
  }, [cartState]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({
        id: index,
        prod: element?._id,
        name: element?.title,
      });
    }
    setProductOpt(data);
  }, [productState]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  useEffect(() => {
    dispatch(getCategories());
  }, []);


  return (
    <>
      <header className="header-top-strip">
        <div className="container">
          <div className="row">
            <div className="coloum">
              <p className="paragraph-1">something@gmail.com</p>
            </div>
            <div className="coloum">
              <p className="paragraph-2">
                Hotline:
                <a style={{ color: "white" }} href="tel:+923249090438">
                  +923249090438
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper">
        <div className="container">
          <div style={{ alignItems: "center" }} className="row-1">
            <div className="coloum-1">
              <h1>
                <Link to="/" style={{ color: "#febd69" }}>
                  Ecom
                </Link>
              </h1>
            </div>
            <div className="coloum-2">
              <div className="input-group">
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log("Result Paginated")}
                  onChange={(selected) => {
                    navigate(`/product/${selected[0]?.prod}`);
                    dispatch(getAProduct(selected[0]?.prod));
                  }}
                  options={productOpt}
                  paginate={paginate}
                  minLength={1}
                  labelKey={"name"}
                  placeholder="Search For Products Here"
                />
                <span className="input-group-text" id="basic-addon2">
                  <BsSearch />
                </span>
              </div>
            </div>
            <div className="coloum-2">
              <div className="header-upper-links">
                <div>
                  <Link
                    to="/wishlist"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "white",
                      gap: 10,
                    }}
                  >
                    <img src={wishlist} alt="wishlist" />
                    <p style={{ marginBottom: 0 }}>
                      Favourite <br /> wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={authState?.user === null ? "/login" : "/my-profile"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "white",
                      gap: 10,
                    }}
                  >
                    <img src={user} alt="user" />
                    {authState?.user === null ? (
                      <p style={{ marginBottom: 0 }}>
                        Log in <br /> My Account
                      </p>
                    ) : (
                      <p style={{ marginBottom: 0 }}>
                        {authState?.user?.firstname +
                          " " +
                          authState?.user?.lastname}
                      </p>
                    )}
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "white",
                      gap: 10,
                    }}
                  >
                    <img src={cart} alt="cart" />
                    <div className="flex">
                      <span className="badge">
                        {cartState?.length ? cartState?.length : 0}
                      </span>
                      <p style={{ marginBottom: 0 }}>
                        $ {totalAmount ? totalAmount : 0}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom">
        <div className="container">
          <div className="row-3">
            <div className="coloum-3">
              <div className="menu-bottom">
                <div>
                  <div className="dropdown">
                    <button className="dropbtn">
                      <img src={menu} alt="" />
                      <span className="spann" style={{ marginLeft: 10 }}>
                       <span> Shop</span> Categories
                      </span>
                    </button>
                    <ul className="dropdown-menu dropdown-button" aria-labelledby="dropdownMenuButton1">
                    
                       {pCatState &&
                        pCatState?.map((item) => {
                          return (
                              <li key={item._id}>
                        <Link 
                        className="dropdown-item"
                         to={`/product?category=${item?.title}`}
                         >
                          {item?.title}
                        </Link>
                      </li>
                          );
                        })} 


                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 15 }}
                  >
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/my-orders">My Orders</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <button onClick={handleLogout} className="l-out">
                      LogOut
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
