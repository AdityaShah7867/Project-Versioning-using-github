require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/versioning";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a schema and model for versioning
const versionSchema = new mongoose.Schema({
  major: { type: Number, default: 1 },
  minor: { type: Number, default: 0 },
  patch: { type: Number, default: 0 },
}, { timestamps: true });

const Version = mongoose.model("Version", versionSchema);

// Initialize the version in the database if it doesn't exist
async function initializeVersion() {
  const version = await Version.findOne();
  if (!version) {
    await Version.create({ major: 1, minor: 0, patch: 0 });
    console.log("Initialized version in MongoDB");
  }
}
initializeVersion();

// API endpoint to increment version based on branch
app.post("/version", async (req, res) => {
  const { branch } = req.body;

  try {
    const version = await Version.findOne();

    if (!version) {
      return res.status(500).json({ error: "Version not initialized" });
    }

    if (branch === "dev") {
      version.patch += 1;
    } else if (branch === "deploy") {
      version.minor += 1;
      version.patch = 0;
    }

    await version.save();

    const latestVersion = `${version.major}.${version.minor}.${version.patch}`;
    res.json({ version: latestVersion });
  } catch (error) {
    console.error("Error updating version:", error);
    res.status(500).json({ error: "Failed to update version" });
  }
});

// API endpoint to get current version
app.get("/version", async (req, res) => {
  try {
    const version = await Version.findOne();
    
    if (!version) {
      return res.status(500).json({ error: "Version not initialized" });
    }

    const currentVersion = `${version.major}.${version.minor}.${version.patch}`;
    res.json({ version: currentVersion });
  } catch (error) {
    console.error("Error fetching version:", error);
    res.status(500).json({ error: "Failed to fetch version" });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
