const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
// Import models
const User = require('../models/users');

// Get all users

router.get('/users', async (req, res) => {
	const users = await User.find();
	res.send(users);
});

// Post a new user

router.post('/users', async (req, res) => {
	try {
		const userData = req.body;
		const existingUser = await User.findOne({ email: userData.email });
		if (existingUser) {
			console.log('User already exists');
			return res.send('User with this email already exists');
		}
		const newUser = new User(req.body);
		const result = await newUser.save();
		res.send(result);
	} catch (error) {
		console.error('Error saving user:', error);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
