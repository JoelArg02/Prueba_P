import axios from "axios";
import apiConfig from "./apiconfig";

const getPruebas = async () => {
  try {
    const response = await axios.get(`${apiConfig.baseURL}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getPruebas };
