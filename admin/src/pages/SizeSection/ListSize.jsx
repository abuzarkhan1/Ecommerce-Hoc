import React, { useEffect, useState } from "react";
import "./ListSize.css";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  getSizes,
  resetState,
  deleteASize,
} from "../../features/size/sizeSlice";
import CustomModel from "../../components/CustomModel/CustomModel"

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ListSize = () => {
  const sizeState = useSelector((state) => state?.size?.sizes);
  // console.log(sizeState);
  const [open, setOpen] = useState(false);
  const [sizeId, setSizeId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setSizeId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getSizes());
  }, []);

  const data1 = [];
  for (let i = 0; i < sizeState?.length; i++) {
    data1.push({
      key: i + 1,
      name: sizeState[i].title,
      action: (
        <>
          <Link to={`/admin/size/${sizeState[i]._id}`} className="pl-icon-1">
            <BiEdit />
          </Link>
          <button
            className="pl-icon-2 brandlist-icon-2"
            onClick={() => showModal(sizeState[i]._id)}
          >
            <AiOutlineDelete />
          </button>
        </>
      ),
    });
  }
  const deleteSize = (e) => {
    dispatch(deleteASize(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getSizes());
    }, 100);
  };

  return (
    <div>
      <h3 className="Size-list-h3">Size List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteSize(sizeId);
        }}
        title="Are you sure you want to delete this size?"
      />
    </div>
  );
};

export default ListSize;
