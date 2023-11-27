const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// import models
const Wishlist = require('../models/wishlist');

// Save a wishlist
router.post('/save-wishlist', async (req, res) => {
	try {
		const newWishlist = new Wishlist(req.body);
		await newWishlist.save();
		res.send('Wishlist saved');
	} catch (error) {
		console.error('Error saving wishlist:', error);
		res.status(500).send('Internal Server Error');
	}
});

// Get all matching wishlist by email

router.get('/wishlist/:email', async (req, res) => {
	try {
		const wishlist = await Wishlist.find({ email: req.params.email });
		res.send(wishlist);
	} catch (error) {
		console.error('Error finding wishlist:', error);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
