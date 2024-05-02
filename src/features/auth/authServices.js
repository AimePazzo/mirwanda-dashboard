import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);
  if(response.data)
  return response.data;
};
const getSingleOrder = async (id) => {
  const response = await axios.get(
    `${base_url}user/get-single-order/${id}`,config);
    if(response.data)
  return response.data;
};
const updateStatus = async (data) => {
  const response = await axios.put(
    `${base_url}user/update-order/${data.id}`,{status:data.status},config);
    if(response.data)
  return response.data;
};

const getYearlySales = async () => {
  const response = await axios.get(
    `${base_url}user/getyearlyorders`,config);
    if(response.data)
  return response.data;
};
const getMonthlyOrders = async () => {
  const response = await axios.get(
    `${base_url}user/getMonthWiseOrderIncome`,config);
    if(response.data)
  return response.data;
};
const authService = {
  login,
  getOrders,
  getSingleOrder,
  updateStatus,
  getYearlySales,
  getMonthlyOrders
};

export default authService;
