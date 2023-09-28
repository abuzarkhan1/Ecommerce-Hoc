import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};



const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);
  return response.data;
}

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data));
    return response.data;
  }
};

const getUserWishlist = async () => {
  const response = await axios.get(`${base_url}user/wishlist`,config);
  if(response.data){
    return response.data;
  }
}
const addToCart = async(cartData) => {
  const response = await axios.post(`${base_url}user/cart`,cartData, config);
  if(response.data){
    return response.data;
  }
}

const getCart = async(data) => {
  console.log("cartser = " , data);
  const response = await axios.get(`${base_url}user/cart`, data);
  if(response.data){
    return response.data;
  }
}

const removeProductFromCart = async (data) => {
  const response = await axios.delete(`${base_url}user/delete-product-cart/${data.id}`, data.config2);
  if(response.data){
    return response.data;
  }
}

const updateProductFromCart = async (cartDetail) => {
  const response = await axios.delete(`${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`, config);
  if(response.data){
    return response.data;
  }
}
const createOrder = async (orderDetail) => {
  const response = await axios.post(`${base_url}user/cart/create-order`,orderDetail ,config);
  if(response.data){
    return response.data;
  }
}

const getUserOrder = async () => {
  const response = await axios.get(`${base_url}user/getmyorders`,config)
  if(response.data){
    return response.data;
  }
}

const updateUser = async (data) => {
  const response = await axios.put(`${base_url}user/edit-user`, data.data , data.config2)
  if(response.data){
    return response.data;
  }
}

const forgotPassToken = async (data) => {
  const response = await axios.post(`${base_url}user/forgot-password-token`, data )
  if(response.data){
    return response.data;
  }
}

const resetPass = async (data) => {
  const response = await axios.put(`${base_url}user/reset-password/${data.token}`, {password:data?.password} )
  if(response.data){
    return response.data;
  }
}

const emptyCart = async () => {
  const response = await axios.delete(`${base_url}user/empty-cart`, config)
  if(response.data){
    return response.data;
  }
}

export const authService = {
  register,
  login,
  getUserWishlist,
  addToCart,
  getCart,
  removeProductFromCart,
  updateProductFromCart,
  createOrder,
  getUserOrder,
  updateUser,
  forgotPassToken,
  resetPass,
  emptyCart,
};
