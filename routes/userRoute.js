const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
// Import models
const User = require("../models/users");

// Get all users
router.get("/users", async (req, res) => {
	const users = await User.find();
	res.send(users);
});

// get specific user by email address
router.get("/users/:email", async (req, res) => {
	const user = await User.findOne({ email: req.params.email });
	res.send(user.role);
});

// Get specific user by email and update role use mongoose findByIdAndUpdate method

router.patch("/users/:id", async (req, res) => {
	const userId = req.params.id;
	const newRole = req.body.role;
	try {
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ $set: { role: newRole } },
			{ new: true, useFindAndModify: false }
		);
		res.send(updatedUser);
		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		console.error("Error updating role:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

// Post a new user

router.post("/users", async (req, res) => {
	try {
		const userData = req.body;
		const existingUser = await User.findOne({ email: userData.email });
		if (existingUser) {
			console.log("User already exists");
			return res.send("User with this email already exists");
		}
		const newUser = new User(req.body);
		const result = await newUser.save();
		res.send(result);
	} catch (error) {
		console.error("Error saving user:", error);
		res.status(500).send("Internal Server Error");
	}
});

module.exports = router;
