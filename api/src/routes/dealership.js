const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const Dealership = require("../models/Dealership");

router.get("/", async (req, res) => {
  try {
    const dealerships = await Dealership.find();
    res.json(dealerships);
  } catch (error) {
    console.error("Error al obtener concesionarias:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dealership = await Dealership.findById(req.params.id);

    if (!dealership) {
      return res.status(404).json({ error: "Concesionaria no encontrada" });
    }

    res.json(dealership);
  } catch (error) {
    console.error("Error al obtener una concesionaria por ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
  const { name, phone, location } = req.body;

  try {
    // Verificar si ya existe una concesionaria con el mismo nombre
    const existingDealership = await Dealership.findOne({ name });

    if (existingDealership) {
      return res
        .status(400)
        .json({ error: "Ya existe una concesionaria con ese nombre" });
    }

    const newDealership = new Dealership({ name, phone, location });
    const savedDealership = await newDealership.save();

    res.status(201).json(savedDealership);
  } catch (error) {
    console.error("Error al agregar una concesionaria:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
