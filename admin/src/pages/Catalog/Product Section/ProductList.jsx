import React, { useState,useEffect } from "react";
import "./ProductList.css";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProducts } from "../../../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../../../components/CustomModel/CustomModel";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title?.length - b.title?.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand?.length - b.brand?.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category?.length - b.category?.length,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Size",
    dataIndex: "size",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productState?.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: productState[i].color,
      size: productState[i]?.size,
      price: `${productState[i].price}`,
      action: (
        <>
           <Link to={`/admin/product/${productState[i]._id}`} className="pl-icon-1">
            <BiEdit />
          </Link>
          <button
            className="pl-icon-2 brandlist-icon-2"
            onClick={() => showModal(productState[i]._id)}
          >
            <AiOutlineDelete />
          </button>
        </>
      ),
    });
  }
  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 200);
  };
  return (
    <div>
      <h3 className="Productlist-list-h3">Product List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(productId);
        }}
        title="Are you sure you want to delete this Product?"
      />
    </div>
  );
};

export default ProductList;
