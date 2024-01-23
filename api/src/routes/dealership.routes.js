const express = require("express");
const router = express.Router();
const Dealership = require("../models/Dealership");

router.get("/", async (req, res) => {
  try {
    const dealerships = await Dealership.find();
    res.json(dealerships);
  } catch (error) {
    console.error("Error fetching dealerships:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dealership = await Dealership.findById(req.params.id);

    if (!dealership) {
      return res.status(404).json({ error: "Dealership not found" });
    }

    res.json(dealership);
  } catch (error) {
    console.error("Error fetching a dealership by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  const { name, phone, location, state, city, country } = req.body;

  try {
    const existingDealership = await Dealership.findOne({ name });

    if (existingDealership) {
      return res
        .status(400)
        .json({ error: "A dealership with that name already exists" });
    }

    const newDealership = new Dealership({
      name,
      phone,
      location,
      state,
      city,
      country,
    });
    const savedDealership = await newDealership.save();

    res.status(201).json(savedDealership);
  } catch (error) {
    console.error("Error adding a dealership:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/:userId/dealership', async (req, res) => {
  try {
    const userId = req.params.userId;

    const dealerships = await Dealership.find({ admins: userId });

    if (!dealerships || dealerships.length === 0) {
      return res.status(404).json({ error: 'Dealerships not found for this user' });
    }

    res.json(dealerships);
  } catch (error) {
    console.error('Error fetching user\'s dealerships:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
