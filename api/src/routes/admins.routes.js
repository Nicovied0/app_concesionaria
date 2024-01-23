const express = require("express");
const router = express.Router();
const Dealership = require("../models/Dealership");
const User = require("../models/User");

router.post("/:dealershipId/addAdmin", async (req, res) => {
  try {
    const { userId } = req.body;
    const dealershipId = req.params.dealershipId;

    const dealership = await Dealership.findById(dealershipId);

    if (!dealership) {
      return res.status(404).json({ error: "Dealership not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!dealership.admins.includes(userId)) {
      dealership.admins.push(userId);
      await dealership.save();
    }

    res
      .status(200)
      .json({ message: "User added as administrator successfully" });
  } catch (error) {
    console.error("Error adding a user as administrator:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
