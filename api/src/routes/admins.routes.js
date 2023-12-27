const express = require('express');
const router = express.Router();
const Dealership = require('../models/Dealership');
const User = require('../models/User'); 

router.post('/:dealershipId/addAdmin', async (req, res) => {
  try {
    const { userId } = req.body; 
    const dealershipId = req.params.dealershipId;

    const dealership = await Dealership.findById(dealershipId);

    if (!dealership) {
      return res.status(404).json({ error: 'Concesionaria no encontrada' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (!dealership.admins.includes(userId)) {
      dealership.admins.push(userId);
      await dealership.save();
    }

    res.status(200).json({ message: 'Usuario añadido como administrador correctamente' });
  } catch (error) {
    console.error('Error al agregar un usuario como administrador:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
