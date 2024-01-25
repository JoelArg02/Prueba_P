const Prueba = require("../models/Prueba");

exports.getPruebas = (req, res) => {
  Prueba.getPruebas((err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al obtener los pagos." });
    }
    return res.status(200).json(result.rows);
  });
};

exports.createPrueba = (req, res) => {
  const pruebaData = req.body; // Obtener los datos del cuerpo de la solicitud

  Prueba.crearPrueba(pruebaData, (err, pruebaId) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al crear la prueba." });
    }
    // Devuelve el id_prueba en la respuesta
    return res.status(201).json({ id_prueba: pruebaId });
  });
};

exports.editPrueba = (req, res) => {
  const id = req.params.id;
  Prueba.editPrueba(id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al editar la prueba." });
    }
    return res.status(200).json({ message: "Prueba editada exitosamente." });
  });
};

exports.deletePrueba = (req, res) => {
  const id = req.params.id;
  Prueba.deletePrueba(id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al eliminar la prueba." });
    }
    return res.status(200).json({ message: "Prueba eliminada exitosamente." });
  });
};

exports.deletePruebaBoolean = (req, res) => {
  const id = req.params.id;
  Prueba.deletePruebaBoolean(id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al eliminar la prueba." });
    }
    return res.status(200).json({ message: "Prueba eliminada exitosamente." });
  });
};
