import React, { useEffect, useState } from "react";
import "./BannerList.css";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import {
  getBanner,
  deleteABanner,
} from "../../features/Banners/bannerSlice";
import CustomModel from "../../components/CustomModel/CustomModel";

const BannerList = () => {
  const bannerState = useSelector((state) => state?.banner?.banners);
  const [open, setOpen] = useState(false);
  const [bannerId, setBannerId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setBannerId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBanner());
  }, []);

  const handleDeleteBanner = (id) => {
    dispatch(deleteABanner(id));
    setOpen(false);
  };

  return (
    <div className="list-banners-container">
      <h3 className="list-banners-heading">Banner List</h3>
      <div className="banners-grid">
        {bannerState?.map((banner) => (
          <div className="banner-item" key={banner._id}>
            <img src={banner.images[0].url} alt={banner.images[0].public_id} />
            <div className="banner-actions">
              <button
                className="delete-icon"
                onClick={() => showModal(banner._id)}
              >
                <AiOutlineDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => handleDeleteBanner(bannerId)}
        title="Are you sure you want to delete this banner?"
      />
    </div>
  );
};

export default BannerList;
