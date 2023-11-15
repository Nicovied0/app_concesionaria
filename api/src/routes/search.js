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

module.exports = router;
