import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getProductCategories = async (category) => {
  let url = `${base_url}category/`;
  
  if (category) {
    url += `?category=${category}`;
  }

  const response = await axios.get(url);
  return response.data;
};
const pCategoryService = {
    getProductCategories,
  };
  
  export default pCategoryService;