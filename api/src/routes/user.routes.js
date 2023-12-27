const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Obtener todos los USUARIOS
router.get("/", async (req, res) => {
  try {
    const todos = await User.find();
    console.log("Se llamó a la ruta /USERS");
    res.json(todos);
  } catch (error) {
    console.error("Error al obtener los usuarios", error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Users.findById(userId);
    console.log("Se llamó a la ruta /USERS/" + userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error al obtener el usuario", error);
    res.status(500).json({ error: "Error al obtener el usuario" });
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
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    console.log("Usuario actualizado:", updatedUser);
    res.json(updatedUser);
  } catch (error) {
    console.error("Error al actualizar el usuario", error);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    imagen,
    email,
    phone,
    password,
    role,
    actived,
    description,
    dealership,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Ya existe un usuario con ese correo electrónico" });
    }

    const newUser = new User({
      name,
      imagen,
      email,
      phone,
      password,
      role,
      actived,
      description,
      dealership,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error al agregar un usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
