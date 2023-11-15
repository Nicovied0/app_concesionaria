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

router.post("/", async (req, res) => {
  const {
    brand,
    model,
    year,
    color,
    price,
    dealershipName,
    state,
    city,
    country,
  } = req.body;

  try {
    console.log("Nombre de la concesionaria:", dealershipName);
    const dealership = await Dealership.findOne({ name: dealershipName });

    if (!dealership) {
      return res.status(404).json({ error: "Concesionaria no encontrada" });
    }

    const newCar = new Car({
      brand,
      model,
      year,
      color,
      price,
      dealershipName,
      state,
      city,
      country,
    });
    const savedCar = await newCar.save();

    dealership.cars.push(savedCar._id);
    await dealership.save();

    const updatedDealership = await Dealership.findById(
      dealership._id
    ).populate("cars");

    res.status(201).json({ car: savedCar, dealership: updatedDealership });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
