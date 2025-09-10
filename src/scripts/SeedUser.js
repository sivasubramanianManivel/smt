import connectDB from "../lib/mongodb.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

async function seedUser() {
  await connectDB();

  const username = "chinna";
  const password = "Chinna$1998"; // plaintext password
  const role = "admin"; // or "user"

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    console.log("User already exists:", existingUser.username);
    process.exit();
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashedPassword,
    role,
  });

  console.log("User created successfully:", user);
  process.exit();
}

seedUser();
