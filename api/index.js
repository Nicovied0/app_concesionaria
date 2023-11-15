const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./src/config/mongo");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const routes = require("./src/routes/index");
app.use("/", routes);

async function startServer() {
  try {
    await dbConnect();
    app.listen(PORT, () => {
      console.log("Successfully connected to MongoDB");
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer();
