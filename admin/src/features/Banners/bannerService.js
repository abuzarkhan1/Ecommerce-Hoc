import axios from 'axios';
import {base_url} from "../../utils/baseUrl"



const getBanners =  async () => {
  const response = await axios.get(`${base_url}banner/`); 
  return response.data;
};

const createBanner = async (banner) => {
  const response = await axios.post(`${base_url}banner/`, banner);
  return response.data;
};

const updateBanner = async (data) => {
  const response = await axios.put(`${base_url}banner/${data.id}`, data);
  return response.data;
};

const deleteBanner = async (id) => {
  await axios.delete(`${base_url}banner/${id}`);
  return id;
};

const bannerService = {
    getBanners,
    createBanner,
    updateBanner,
    deleteBanner
};
export default bannerService;