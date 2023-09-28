import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { configureStore } from "@reduxjs/toolkit";
import authReducer  from "../features/user/userSlice";
import productReducer from "../features/product/productSlice";
import blogReducer from '../features/blogs/blogSlice';
import contactReducer from '../features/contact/contactSlice';
import colorReducer from "../features/colors/colorSlice"
import pCategoryReducer from '../features/Pcat/PcategorySlice';
import bannerReducer from "../features/Banners/bannerSlice"

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})


export const store = configureStore({
  reducer: {
    auth: authReducer,
    product : productReducer,
    blog : blogReducer,
    contact:contactReducer,
    color : colorReducer,
    pCategory : pCategoryReducer,
    banner : bannerReducer
  },
    middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
