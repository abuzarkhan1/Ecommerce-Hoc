import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";
const getProducts = async (data) => {
  try {
    const response = await axios.get(
      `${base_url}product?${data?.brand ? `brand=${data?.brand}&&` : ""}${
        data?.tag ? `tags=${data?.tag}&&` : ""
      }${data?.color ? `color=${data?.color}&&` : ""}${
        data?.category ? `category=${data?.category}&&` : ""
      }${data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""}${
        data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""
      }${data?.sort ? `sort=${data?.sort}&&` : ""}`
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
};

const getSingleProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  if (response.data) {
    console.log("Single Product: ", JSON.stringify(response));
    return response.data;
  }
};

const addToWishlist = async (prodId) => {
  console.log(prodId);
  const response = await axios.put(
    `${base_url}product/wishlist`,
    { prodId },
    config
  );
  if (response.data) {
    return response.data;
  }
};
const rateProduct = async (data) => {
  const response = await axios.put(`${base_url}product/rating`, data, config);
  if (response.data) {
    return response.data;
  }
};

export const productService = {
  getProducts,
  addToWishlist,
  getSingleProduct,
  rateProduct,
};
