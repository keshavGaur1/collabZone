import {User} from '../models/user.model.js';
import jwt from 'jsonwebtoken';

// Signup Controller
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Signin Controller
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Signin successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in', error: error.message });
  }
};

// signout Controller
const signout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Signout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error signing out', error: error.message });
  }
};

const getCurrnetUser = async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        req.user,
        "Current user details fetched successfully "
      )
    );
};

const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Check if both oldPassword and newPassword are provided
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Both old and new passwords are required' });
    }

    // Find the user by ID (assuming req.user contains the authenticated user's ID)
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate the old password
    const isPasswordValid = await user.comparePassword(oldPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    // Update the password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password', error: error.message });
  }
};
export {
  signup,
  signin,
  signout,
  getCurrnetUser,
  updatePassword,
};