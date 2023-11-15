
const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error("Error al obtener automóviles:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
  const { brand, model, year, color, price } = req.body;

  try {
    const newCar = new Car({ brand, model, year, color, price });
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    console.error("Error al agregar un automóvil:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
