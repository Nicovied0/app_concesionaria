const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Dealership = require("../models/Dealership");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    console.log("Route /USERS was called");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    console.log("Route /USERS/" + userId + " was called");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user", error);
    res.status(500).json({ error: "Error fetching user" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User updated:", updatedUser);
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user", error);
    res.status(500).json({ error: "Error updating user" });
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    image,
    email,
    phone,
    password,
    role,
    active,
    description,
    dealership,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "A user with that email already exists" });
    }

    const newUser = new User({
      name,
      image,
      email,
      phone,
      password,
      role,
      active,
      description,
      dealership,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error adding a user", error);
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
