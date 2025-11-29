import mongoose from "mongoose";

const ViewerSettingsSchema = new mongoose.Schema(
  {
    backgroundColor: {
      type: String,
      default: "#1a1a1a",
      required: true,
    },
    wireframeMode: {
      type: Boolean,
      default: false,
    },
    modelUrl: {
      type: String,
      default: "",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const ViewerSettings = mongoose.model("ViewerSettings", ViewerSettingsSchema);

export default ViewerSettings;
