import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBanners } from '../../features/Banners/bannerSlice';
import './AddBanner.css'; // Import your custom CSS
import { FcUpload } from 'react-icons/fc';
import { uploadImg } from '../../features/upload/uploadSlice';
import Dropzone from 'react-dropzone';


const AddBanner = () => {
  const dispatch = useDispatch();

  const imgState = useSelector((state)=>state?.upload);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const bannerData = {
      images: [
        {
          public_id: imgState?.images[0]?.public_id,
          url : imgState?.images[0]?.url
        }
      ]
    };
    dispatch(createBanners(bannerData));
  }    
  


  return (
    <div className="add-banner-container">
      <h2 className="add-banner-title">Add Banner</h2>
      <form   className="add-banner-form">
        <div className="banner">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <FcUpload  className='iconss-fc'/>
                    <p>
                      Drag 'n' drop some files here
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        <button type="submit" onClick={handleFormSubmit} className="add-banner-button">
          Add Banner
        </button>
      </form>
    </div>
  );
};

export default AddBanner;
