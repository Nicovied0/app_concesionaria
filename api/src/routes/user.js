const express = require("express");
const router = express.Router();
const Users = require("../models/User");

// Obtener todos los USUARIOS
router.get("/", async (req, res) => {
  try {
    const todos = await Users.find();
    console.log("Se llamó a la ruta /USERS");
    res.json(todos);
  } catch (error) {
    console.error("Error al obtener los usuarios", error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id; // Obtiene el ID desde el parámetro de la URL
    const user = await Users.findById(userId); // Busca el usuario por su ID
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
    const userId = req.params.id; // Obtiene el ID desde el parámetro de la URL
    const updatedUserData = req.body; // Obtiene los datos actualizados del usuario desde el cuerpo de la solicitud

    // Aquí podrías validar los datos actualizados si es necesario

    const updatedUser = await Users.findByIdAndUpdate(userId, updatedUserData, { new: true });

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

module.exports = router;