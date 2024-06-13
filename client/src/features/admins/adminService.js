import axios from "axios";
import { cust_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

export const fetchAdmins = async () => {
  try {
    const response = await axios.get(`${cust_url}/all`, config);
    return response.data;
  } catch (err) {
    console.log("Error in getting admins data : ", err);
    throw err;
  }
};

export const deleteAdmins = async (IdAdmin) => {
  try {
    const response = await axios.delete(`${cust_url}/${IdAdmin}`, config);
    return response.data;
  } catch (err) {
    console.log("Error in deleting admins data : ", err);
    throw err;
  }
};
export const updateAdmins = async (IdAdmin, admin) => {
  try {
    const response = await axios.put(`${cust_url}/${IdAdmin}`, admin, config);
    return response.data;
  } catch (err) {
    console.log("Error in updating admins data : ", err);
    throw err;
  }
};
export const createAdmins = async (admin) => {
  try {
    const response = await axios.post(`${cust_url}/newAdmin`, admin, config);
    return response.data;
  } catch (err) {
    console.log("Error in creating admins data : ", err);
    throw err;
  }
};
