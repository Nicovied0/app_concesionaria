
const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

router.get("/", async (req, res) => {
    try {
      let sortField = 'price'; // Campo de ordenación predeterminado para 'desc' y 'asc'
      let sortOrder = 1; // Por defecto, orden ascendente
  
      // Obtener el parámetro que indica el tipo de ordenamiento
      const orderType = req.query.sort;
  
      if (orderType === 'may' || orderType === 'men') {
        // Orden por precio (price) para 'desc' y 'asc'
        sortOrder = orderType === 'may' ? -1 : 1;
      } else if (orderType === 'visits') {
        // Orden por cantidad de visitas (counterVisits) para 'visits'
        sortField = 'counterVisits';
        sortOrder = -1
      } else {
        return res.status(400).json({ error: "Parámetro de ordenamiento no válido" });
      }
  
      const cars = await Car.find().sort({ [sortField]: sortOrder });
      res.json(cars);
    } catch (error) {
      console.error("Error al obtener automóviles:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });
  
  


  module.exports = router;
