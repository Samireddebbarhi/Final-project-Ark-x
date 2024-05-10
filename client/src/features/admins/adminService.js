import axios from "axios";
import { cust_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";
const getAdmins = async () => {
  const response = await axios.get(`${cust_url}/all`, config);

  return response.data;
};

const adminService = {
  getAdmins,
};

export default adminService;
