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

const editPrueba = async (id, prueba) => {
  try {
    const response = await axios.put(
      `${apiConfig.baseURL}/pruebas/editar/${id}`,
      prueba
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deletePruebaBoolean = async (id) => {
  try {
    const response = await axios.put(
      `${apiConfig.baseURL}/pruebas/estado/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deletePrueba = async (id) => {
  try {
    const response = await axios.delete(
      `${apiConfig.baseURL}/pruebas/eliminar/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getPruebas, createPrueba, editPrueba, deletePrueba, deletePruebaBoolean };
