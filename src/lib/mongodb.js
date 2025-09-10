import mongoose from "mongoose";

let isConnected = false; // track connection

console.log(process.env.MONGODB_URI)

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "yourDBName", // optional
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err; // this will cause 500 if connection fails
  }
};

export default connectDB;
