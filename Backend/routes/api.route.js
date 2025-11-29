import express from "express";
import ViewerSettings from "../models/ViewerSettings.model.js";
const router = express.Router();

// Save Viewer Settings
router.post("/settings", async (req, res) => {
  try {
    const { backgroundColor, wireframeMode, modelUrl } = req.body;

    const settings = new ViewerSettings({
      backgroundColor,
      wireframeMode,
      modelUrl,
    });

    await settings.save();

    res.status(201).json({
      message: "Settings saved successfully",
      data: settings,
    });
  } catch (error) {
    console.error("Error saving settings:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get Latest Settings
router.get("/settings", async (req, res) => {
  try {
    const settings = await ViewerSettings.findOne().sort({ timestamp: -1 });

    if (!settings) {
      return res.json({
        backgroundColor: "#1a1a1a",
        wireframeMode: false,
        modelUrl: "",
      });
    }

    res.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get All Settings History (Last 10)
router.get("/settings/all", async (req, res) => {
  try {
    const settings = await ViewerSettings.find()
      .sort({ timestamp: -1 })
      .limit(10);

    res.json(settings);
  } catch (error) {
    console.error("Error fetching settings history:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific setting
router.delete("/settings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await ViewerSettings.findByIdAndDelete(id);
    res.json({ message: "Setting deleted successfully" });
  } catch (error) {
    console.error("Error deleting setting:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
