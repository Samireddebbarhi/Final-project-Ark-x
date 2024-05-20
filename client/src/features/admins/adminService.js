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
