import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGODB_URI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/3d-viewer";

    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};

export default connectDB;
