import axios from "axios";
import apiConfig from "./apiconfig";

const getPruebas = async () => {
  try {
    const response = await axios.get(`${apiConfig.baseURL}/pruebas`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createPrueba = async (prueba) => {
  try {
    const response = await axios.post(
      `${apiConfig.baseURL}/pruebas/crear`,
      prueba
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export { getPruebas,createPrueba };
