// En cars.js
const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const Dealership = require("../models/Dealership");

// Obtener todos los autos
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error("Error al obtener automóviles:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Crear un nuevo auto
router.post("/", async (req, res) => {
  try {
    // Obtener los datos del cuerpo de la solicitud (req.body)
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

    // Encontrar la concesionaria por su nombre
    const dealership = await Dealership.findOne({ name: dealershipName });

    if (!dealership) {
      return res.status(404).json({ error: "Concesionaria no encontrada" });
    }

    // Crear un nuevo auto
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

    // Guardar el auto en la base de datos
    const savedCar = await newCar.save();

    // Actualizar la lista de autos de la concesionaria
    dealership.cars.push(savedCar._id);
    await dealership.save();

    // Actualizar la concesionaria con la lista actualizada de autos
    const updatedDealership = await Dealership.findById(dealership._id).populate("cars");

    res.status(201).json({ car: savedCar, dealership: updatedDealership });
  } catch (error) {
    console.error("Error al crear un nuevo auto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener un auto por su ID
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

// Actualizar un auto por su ID
router.put("/:id", async (req, res) => {
  const carId = req.params.id;
  const updateData = req.body; // Datos para actualizar el auto

  try {
    // Buscar el auto por su ID y actualizarlo
    const updatedCar = await Car.findByIdAndUpdate(carId, updateData, {
      new: true,
    });

    if (!updatedCar) {
      return res.status(404).json({ error: "Automóvil no encontrado" });
    }

    res.json(updatedCar); // Devolver el auto actualizado como respuesta
  } catch (error) {
    console.error("Error al actualizar un auto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ordenar autos por precio
router.get("/order", async (req, res) => {
  try {
    let sortOrder = 1; // Por defecto, orden ascendente

    if (req.query.sort === 'higher') {
      sortOrder = -1; // Orden descendente para precios más altos primero
    } else if (req.query.sort === 'less') {
      sortOrder = 1; // Orden ascendente para precios más bajos primero
    }

    const cars = await Car.find().sort({ price: sortOrder });
    res.json(cars);
  } catch (error) {
    console.error("Error al obtener automóviles:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
