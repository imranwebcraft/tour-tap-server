const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//Get models
const BookPackage = require('../models/bookPaackage');

// get all booking data

router.get('/book-package', async (req, res) => {
	try {
		const packages = await BookPackage.find();
		res.send(packages);
	} catch (error) {
		console.error('Error saving package:', error);
		res.status(500).send('Internal Server Error');
	}
});

// get all matched booking data based on touristEmail
router.get('/book-package', async (req, res) => {
	try {
		const touristEmail = req.params.touristEmail;
		const filter = { touristEmail: { $regex: new RegExp(touristEmail, 'i') } };
		const packages = await BookPackage.find(filter);
		res.send(packages);
	} catch (error) {
		console.error('Error finding package:', error);
		res.status(500).send('Internal Server Error');
	}
});

// Post a booking data
router.post('/book-package', async (req, res) => {
	try {
		const newPackage = new BookPackage(req.body);
		const result = await newPackage.save();
		res.send(result);
	} catch (error) {
		console.error('Error saving package:', error);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
