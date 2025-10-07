import { UserModel } from "../../../db/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET);
  return res.status(200).json({ message: 'User logged in successfully', token });
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET
    );

    return res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error("CreateUser Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUsers = async (req, res) => {
  const users = await UserModel.find({}); //{/* { password: 0 } */}
  return res.json({ message: 'Users fetched successfully', users });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, password } = req.body || {};
  const update = { name, email, role };
  if (password) update.password = await bcrypt.hash(password, 10);
  const doc = await UserModel.findByIdAndUpdate(id, update, { new: true, projection: { password: 0 } });
  if (!doc) return res.status(404).json({ message: 'User not found' });
  return res.json(doc);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const deleted = await UserModel.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: 'User not found' });
  return res.json({ message: 'User deleted successfully' });
};

export { login, createUser, getUsers, updateUser, deleteUser };
