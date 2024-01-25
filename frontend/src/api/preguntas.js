import axios from "axios";
import apiConfig from "./apiconfig";

const getPreguntas = async () => {
  try {
    const response = await axios.get(`${apiConfig.baseURL}/preguntas`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getPreguntasById = async (id) => {
  try {
    const response = await axios.get(
      `${apiConfig.baseURL}/preguntas/prueba-p/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const crearPreguntas = async (pregunta) => {
  try {
    const response = await axios.post(
      `${apiConfig.baseURL}/preguntas/crear`,
      pregunta
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const editarPreguntas = async (id, pregunta) => {
  try {
    const response = await axios.put(
      `${apiConfig.baseURL}/preguntas/editar/${id}`,
      pregunta
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const eliminarPreguntas = async (id) => {
  try {
    const response = await axios.delete(
      `${apiConfig.baseURL}/preguntas/eliminar/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const eliminarPreguntasBoolean = async (id) => {
  try {
    const response = await axios.put(
      `${apiConfig.baseURL}/preguntas/estado/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  getPreguntas,
  getPreguntasById,
  crearPreguntas,
  editarPreguntas,
  eliminarPreguntas,
  eliminarPreguntasBoolean,
};
