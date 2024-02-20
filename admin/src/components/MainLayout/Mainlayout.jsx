import React, { useState } from "react";
import "./Mainlayout.css";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxDashboard } from "react-icons/rx";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineCloudUpload, AiOutlineUser } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import { VscSymbolColor } from "react-icons/vsc";
import { SiBrandfolder, SiBloglovin } from "react-icons/si";
import { FaClipboardList, FaListUl } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { Outlet } from "react-router-dom";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
import {RiCouponLine} from "react-icons/ri"
import {SiZend} from "react-icons/si"
import {CiLogout} from "react-icons/ci"
import {useSelector} from "react-redux"
const { Header, Sider, Content } = Layout;
const Mainlayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
 const userState = useSelector((state)=>state?.auth?.user)
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="logo-heading">Ecom</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
              localStorage.clear()
              window.location.reload()
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <RxDashboard style={{ fontSize: "1.2rem" }} />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <AiOutlineUser style={{ fontSize: "1.2rem" }} />,
              label: "Customers",
            },
            {
              key: "Catalog",
              icon: <RxDashboard style={{ fontSize: "1.2rem" }} />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <BsCart4 style={{ fontSize: "1.2rem" }} />,
                  label: "Add Product",
                },
                {
                  key: "product-list",
                  icon: <BsCart4 style={{ fontSize: "1.2rem" }} />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder style={{ fontSize: "1.2rem" }} />,
                  label: "Brand",
                },
                {
                  key: "list-brand",
                  icon: <SiBrandfolder style={{ fontSize: "1.2rem" }} />,
                  label: "Brand List",
                },
                {
                  key: "category",
                  icon: <MdCategory style={{ fontSize: "1.2rem" }} />,
                  label: "Category",
                },
                {
                  key: "category-list",
                  icon: <MdCategory style={{ fontSize: "1.2rem" }} />,
                  label: "Category-List",
                },
                {
                  key: "color",
                  icon: <VscSymbolColor style={{ fontSize: "1.2rem" }} />,
                  label: "Color",
                },
                {
                  key: "color-list",
                  icon: <VscSymbolColor style={{ fontSize: "1.2rem" }} />,
                  label: "Color-List",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList style={{ fontSize: "1.2rem" }} />,
              label: "Orders",
            },
            {
              key: "size",
              icon: <SiZend style={{ fontSize: "1.2rem" }} />,
              label: "Size",
              children: [
                {
                  key: "addsize",
                  icon: <RiCouponLine style={{ fontSize: "1.2rem" }} />,
                  label: "Add Size",
                },
                {
                  key: "size-list",
                  icon: <FaListUl style={{ fontSize: "1.2rem" }} />,
                  label: "Size List",
                },
              ],
            },
            {
              key: "blogs",
              icon: <SiBloglovin style={{ fontSize: "1.2rem" }} />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <IoIosAddCircle style={{ fontSize: "1.2rem" }} />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <FaListUl style={{ fontSize: "1.2rem" }} />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <IoIosAddCircle style={{ fontSize: "1.2rem" }} />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <FaListUl style={{ fontSize: "1.2rem" }} />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "banners",
              icon: <AiOutlineCloudUpload style={{ fontSize: "1.2rem" }} />,
              label: "Banners",
              children:[
                {
                  key: "banner",
                  icon: <IoIosAddCircle style={{ fontSize: "1.2rem" }} />,
                  label: "Add Banner",
                },
                {
                  key: "banner-list",
                  icon: <FaListUl style={{ fontSize: "1.2rem" }} />,
                  label: "Banner List",
                },
              ]
            },
            {
              key: "enquiries",
              icon: <FaClipboardList style={{ fontSize: "1.2rem" }} />,
              label: "Enquiries",
            },
            {
              key: "signout",
              icon: <CiLogout style={{ fontSize: "1.2rem" }} />,
              label: "Sign Out",
            },
           
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="layout-header-1"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="layout-div-1">
            <div className="layout-div-4">
            </div>
            <div className="layout-div-2">
              <div className="layout-div-3">
                <h5 className="layout-h5">{userState?.firstname}</h5>
                <p className="layout-p">{userState?.email}</p>
              </div>
              <div className="dropdwon-menu"></div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Mainlayout;
