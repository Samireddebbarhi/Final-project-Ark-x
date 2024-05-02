import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url, admin_url } from "../../utils/baseUrl";
const login = async (user) => {
  const response = await axios.post(`${admin_url}/login`, user);
  if (response.data) {
    localStorage.setItem("userAdmin", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  login,
};

export default authService;
