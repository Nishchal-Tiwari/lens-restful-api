const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const redisClient = require('../config/redisClient'); 

const generateToken = async  (id) => {
  const token= jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  await redisClient.set(token, 'valid', { EX: 15 * 60 });
  return token;
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: await generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: await generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Logout User 
const logoutUser = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  // Remove the token from Redis
  await redisClient.del(token);

  res.json({ message: 'User logged out successfully' });
};

//Get User Profile 
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { registerUser, authUser, logoutUser, getUserProfile };
