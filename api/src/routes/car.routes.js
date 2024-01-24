const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const Dealership = require("../models/Dealership");

router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
    } = req.body;

    const dealership = await Dealership.findOne({ name: dealershipName });

    if (!dealership) {
      return res.status(404).json({ error: "Dealership not found" });
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
    });

    const savedCar = await newCar.save();

    dealership.cars.push(savedCar._id);
    await dealership.save();

    const updatedDealership = await Dealership.findById(
      dealership._id
    ).populate("cars");

    res.status(201).json({ car: savedCar, dealership: updatedDealership });
  } catch (error) {
    console.error("Error creating a new car:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  const carId = req.params.id;

  try {
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json(car);
  } catch (error) {
    console.error("Error fetching a car by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
      return res.status(404).json({ error: "Car not found" });
    }

    res.json(updatedCar);
  } catch (error) {
    console.error("Error updating a car:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const carId = req.params.id;

  try {
    const deleteCar = await Car.findByIdAndDelete(carId);
    if (!deleteCar) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting a car", error);
    res.status(500).json({ error: "Error deleting car on the server" });
  }
});

module.exports = router;
