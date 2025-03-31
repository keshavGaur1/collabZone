import {User} from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Signup Controller
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ 
      username, 
      email, 
      password: hashedPassword 
    });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { 
      expiresIn: '1h' 
    });

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.status(201).json({ 
      success: true,
      message: 'User created successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error creating user', 
      error: error.message 
    });
  }
};

// Signin Controller
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Debug: Log incoming credentials
    console.log('Login attempt for:', email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Debug: Log stored password hash
    console.log('Stored hash:', user.password);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    
    console.log('Password match result:', isMatch); // Debug

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};

// signout Controller
const signout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ 
      success: true,
      message: 'Signout successful' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error signing out', 
      error: error.message 
    });
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