import axios from "axios";
import apiConfig from "./apiconfig";

const getPreguntasById = async (id) => {
  try {
    const response = await axios.get(`${apiConfig.baseURL}/preguntas/prueba-p/${id}`);
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
  
export { getPreguntasById, crearPreguntas};
