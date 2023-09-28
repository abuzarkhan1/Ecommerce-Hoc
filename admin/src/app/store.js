import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import pCategoryReducer from "../features/pcategory/pcategorySlice";
import blogReducer from "../features/blogs/blogSlice";
import bCategoryReducer from "../features/bcategory/bcategorySlice";
import colorReducer from "../features/color/colorSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import uploadReducer from "../features/upload/uploadSlice";
import couponReducer from "../features/coupon/couponSlice"
import sizeReducer from "../features/size/sizeSlice"
import bannerReducer from "../features/Banners/bannerSlice"

import { getDefaultMiddleware } from '@reduxjs/toolkit';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})
export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    pCategory: pCategoryReducer,
    blogs: blogReducer,
    bCategory: bCategoryReducer,
    color: colorReducer,
    enquiry: enquiryReducer,
    upload: uploadReducer,
    coupon: couponReducer,
    size : sizeReducer,
    banner : bannerReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
