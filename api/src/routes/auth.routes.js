const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", (req, res) => {
  const { name, imagen, email, phone, password, role, actived, description } =
    req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: "El email ya está registrado" });
      }

      const newUser = new User({
        name: name,
        email: email,
        name,
        imagen,
        email,
        phone,
        role,
        actived,
        description,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      });

      newUser
        .save()
        .then((user) => {
          res.status(201).json({ message: "Registro exitoso" });
        })
        .catch((error) => {
          res.status(500).json({ message: "Error en el servidor" });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error en el servidor" });
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ message: "Email o contraseña incorrectos" });
      }

      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "Email o contraseña incorrectos" });
      }

      const token = jwt.sign({ userId: user._id }, "secreto");

      res.status(200).json({ token: token });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error en el servidor" });
    });
});

router.get("/profile", (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  jwt.verify(token, "secreto", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }
    const userId = decoded.userId;
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const userProfile = {
          name: user.name,
          email: user.email,
          imagen: user.imagen,
          phone: user.phone,
          description: user.description,
          role: user.role,
          id: userId,
        };
        console.log(userId);
        res.status(200).json({ profile: userProfile });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error en el servidor" });
      });
  });
});

router.put("/profile/edit", (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }
  jwt.verify(token, "secreto", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }

    const userId = decoded.userId;

    const updateFields = {};
    if (req.body.name) {
      updateFields.name = req.body.name;
    }
    if (req.body.email) {
      updateFields.email = req.body.email;
    }
    if (req.body.imagen) {
      updateFields.imagen = req.body.imagen;
    }
    if (req.body.number) {
      updateFields.number = req.body.number;
    }
    if (req.body.description) {
      updateFields.description = req.body.description;
    }

    User.findByIdAndUpdate(userId, updateFields, {
      new: true,
      omitUndefined: true,
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const userProfile = {
          name: user.name,
          email: user.email,
          imagen: user.imagen,
          number: user.number,
          description: user.description,
          role: user.role,
        };

        res.status(200).json({ profile: userProfile });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error en el servidor" });
      });
  });
});

module.exports = router;
