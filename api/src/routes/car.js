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
    images,
    year,
    color,
    price,
    kilometres,
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
      images,
      year,
      color,
      price,
      kilometres,
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

  router.get("/:id", async (req, res) => {
    const carId = req.params.id;

    try {
      const car = await Car.findById(carId).populate("dealershipName");

      if (!car) {
        return res.status(404).json({ error: "Automóvil no encontrado" });
      }

      res.json(car);
    } catch (error) {
      console.error("Error al obtener automóvil por ID:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });
});

router.put("/:id", async (req, res) => {
  const carId = req.params.id;
  const updateData = req.body; // Datos para actualizar el automóvil

  try {
    // Buscar el automóvil por su ID y actualizarlo
    const updatedCar = await Car.findByIdAndUpdate(carId, updateData, {
      new: true,
    });

    if (!updatedCar) {
      return res.status(404).json({ error: "Automóvil no encontrado" });
    }

    res.json(updatedCar); // Devolver el automóvil actualizado como respuesta
  } catch (error) {
    console.error("Error al actualizar automóvil:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
