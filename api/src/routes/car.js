const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const Dealership = require("../models/Dealership");

router.get("/", async (req, res) => {
  try {
    const cars = await Car.find().populate("dealershipName");
    res.json(cars);
  } catch (error) {
    console.error("Error al obtener automóviles:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Agregar un nuevo automóvil asociado a una concesionaria
router.post("/", async (req, res) => {
  const { brand, model, year, color, price, dealershipName } = req.body;

  try {
    // Verificar si la concesionaria existe
    const dealership = await Dealership.findById(dealershipName);
    if (!dealership) {
      return res.status(404).json({ error: "Concesionaria no encontrada" });
    }

    const newCar = new Car({ brand, model, year, color, price, dealershipName });
    const savedCar = await newCar.save();

    // Asociar el automóvil a la concesionaria
    dealership.cars.push(savedCar._id);
    await dealership.save();

    res.status(201).json(savedCar);
  } catch (error) {
    console.error("Error al agregar un automóvil:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
