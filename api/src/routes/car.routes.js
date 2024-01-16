// En cars.js
const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const Dealership = require("../models/Dealership");

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
  try {
    const {
      brand,
      model,
      images,
      year,
      color,
      price,
      kilometres,
      dealershipName,
      state,
      city,
      country,
      condition,
      counterVisits,
    } = req.body;

    const dealership = await Dealership.findOne({ name: dealershipName });

    if (!dealership) {
      return res.status(404).json({ error: "Concesionaria no encontrada" });
    }

    const newCar = new Car({
      brand,
      model,
      images,
      year,
      color,
      price,
      kilometres,
      dealershipName,
      state,
      city,
      country,
      condition,
      counterVisits,
    });

    const savedCar = await newCar.save();

    dealership.cars.push(savedCar._id);
    await dealership.save();

    const updatedDealership = await Dealership.findById(
      dealership._id
    ).populate("cars");

    res.status(201).json({ car: savedCar, dealership: updatedDealership });
  } catch (error) {
    console.error("Error al crear un nuevo auto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/:id", async (req, res) => {
  const carId = req.params.id;

  try {
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ error: "Automóvil no encontrado" });
    }

    res.json(car);
  } catch (error) {
    console.error("Error al obtener un auto por ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/:id", async (req, res) => {
  const carId = req.params.id;
  const updateData = req.body;

  try {
    const updatedCar = await Car.findByIdAndUpdate(carId, updateData, {
      new: true,
    });

    if (!updatedCar) {
      return res.status(404).json({ error: "Automóvil no encontrado" });
    }

    res.json(updatedCar);
  } catch (error) {
    console.error("Error al actualizar un auto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
