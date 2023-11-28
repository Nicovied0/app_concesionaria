const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

router.get("/", async (req, res) => {
  try {
    const { brand, year, state, city, dealershipName } = req.query;

    const filter = {};

    if (brand) {
      filter.brand = brand;
    }

    if (year) {
      filter.year = year;
    }

    if (state) {
      filter.state = state;
    }

    if (city) {
      filter.city = city;
    }

    if (dealershipName) {
      filter.dealershipName = dealershipName;
    }

    const cars = await Car.find(filter);

    res.json(cars);
  } catch (error) {
    console.error("Error al buscar autos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});



// Ruta para buscar por modelo o marca
router.get('/byname', async (req, res) => {
  const { consulta } = req.query;
  try {
    if (!consulta) {
      return res.status(400).json({ message: 'Proporcione una consulta' });
    }

    const regexConsulta = new RegExp(consulta, 'i');
    const resultados = await Car.find({
      $or: [{ model: regexConsulta }, { brand: regexConsulta }],
    });

    res.json(resultados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
