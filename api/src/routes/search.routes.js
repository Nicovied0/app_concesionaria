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
    console.error("Error searching for cars:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/byname', async (req, res) => {
  const { query } = req.query;
  try {
    if (!query) {
      return res.status(400).json({ message: 'Provide a query' });
    }

    const regexQuery = new RegExp(query, 'i');
    const results = await Car.find({
      $or: [{ model: regexQuery }, { brand: regexQuery }],
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
