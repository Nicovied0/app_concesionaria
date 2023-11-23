const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

router.get("/", async (req, res) => {
  try {
    let sortField = "price";
    let sortOrder = 1;

    const orderType = req.query.sort;

    if (orderType === "may" || orderType === "men") {
      sortOrder = orderType === "may" ? -1 : 1;
    } else if (orderType === "visits") {
      sortField = "counterVisits";
      sortOrder = -1;
    } else {
      return res
        .status(400)
        .json({ error: "Parámetro de ordenamiento no válido" });
    }

    const cars = await Car.find().sort({ [sortField]: sortOrder });
    res.json(cars);
  } catch (error) {
    console.error("Error al obtener automóviles:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
