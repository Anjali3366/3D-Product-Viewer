import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./configs/dbs.js";
import apiRoutes from "./routes/api.route.js";
const app = express();

// Connect to MongoDB
connectDB();

// Create uploads directory if it doesn't exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Multer Setup for File Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === ".glb" || ext === ".gltf") {
      cb(null, true);
    } else {
      cb(new Error("Only .glb and .gltf files are allowed"));
    }
  },
});

// Model Upload Route
app.post("/api/upload", upload.single("model"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    res.json({
      message: "File uploaded successfully",
      url: fileUrl,
      filename: req.file.filename,
      size: req.file.size,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.json({ message: "3D Viewer API is running" });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: error.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
