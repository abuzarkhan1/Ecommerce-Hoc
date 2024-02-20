import React, { useEffect,useState } from "react";
import "./BlogCategoryList.css";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteABlogCat,
  getCategories,
  resetState,
} from "../../../features/bcategory/bcategorySlice";
import { AiOutlineDelete } from "react-icons/ai";
import CustomModel from "../../../components/CustomModel/CustomModel"

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name?.length - b.name?.length,
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogCategoryList = () => {
  const [open, setOpen] = useState(false);
  const [blogCatId, setblogCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setblogCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);

  const bCatState = useSelector((state) => state.bCategory.bCategories);
  const data1 = [];
  for (let i = 0; i < bCatState?.length; i++) {
    data1.push({
      key: i + 1,
      name: bCatState[i].title,
      category: bCatState[i].category,
      action: (
        <>
         <Link
           to={`/admin/blog-category/${bCatState[i]._id}`}
            className="pl-icon-1"
          >
            <BiEdit />
          </Link>
          <button
            className="pl-icon-2 brandlist-icon-2"
            onClick={() => showModal(bCatState[i]._id)}
          >
            <AiOutlineDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBlogCategory = (e) => {
    dispatch(deleteABlogCat(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };
  return (
    <div>
      <h3 className="bcat-list-h3">Blog Category List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlogCategory(blogCatId);
        }}
        title="Are you sure you want to delete this blog category?"
      />
    </div>
  );
};

export default BlogCategoryList;
