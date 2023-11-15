const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  try {
    const DB_URI = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.gfac6fk.mongodb.net/${process.env.NAME_DB}?retryWrites=true&w=majority`;

    console.log("USER:", process.env.USER_NAME);
    console.log("PASS:", process.env.USER_PASS);
    console.log("NAME_DB:", process.env.NAME_DB);

    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

mongoose.set("strictQuery", false);

module.exports = dbConnect;
