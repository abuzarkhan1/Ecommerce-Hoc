import React,{useEffect,useState} from 'react'
import "./Bloglist.css"
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from 'react-icons/ai';
import { getBlogs, deleteABlog,resetState } from '../../../features/blogs/blogSlice';
import CustomModel from "../../../components/CustomModel/CustomModel"

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];


const Bloglist = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setblogId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);
  const getBlogState = useSelector((state)=>state.blogs.blogs);
  const data1 = [];
for (let i = 0; i < getBlogState?.length; i++) {
  data1.push({
    key: i + 1,
    name: getBlogState[i].title,
    category: getBlogState[i].category,
    action: (
      <>
        <Link
            to={`/admin/blog/${getBlogState[i].id}`}
            className="pl-icon-1"
          >
            <BiEdit />
          </Link>
          <button
            className="pl-icon-2 brandlist-icon-2"
            onClick={() => showModal(getBlogState[i]._id)}
          >
            <AiOutlineDelete />
          </button>
      </>
    ),
  });
}
const deleteBlog = (e) => {
  dispatch(deleteABlog(e));

  setOpen(false);
  setTimeout(() => {
    dispatch(getBlogs());
  }, 100);
};

  return (
    <div>
        <h3 className='b-list-h3'>Bloglist</h3>
        <div>
        <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlog(blogId);
        }}
        title="Are you sure you want to delete this blog?"
      />
    </div>
  )
}

export default Bloglist