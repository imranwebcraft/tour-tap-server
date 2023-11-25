const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Package = require('../models/package');

// Get all packages
router.get('/package', async (req, res) => {
	try {
		const packages = await Package.find();
		res.send('You got your packages');
	} catch (error) {
		console.error('Error saving package:', error);
		res.status(500).send('Internal Server Error');
	}
});

// Post a package
router.post('/package', async (req, res) => {
	try {
		const newPackage = new Package(req.body);
		await newPackage.save();
		res.send('Your package is saved');
	} catch (error) {
		console.error('Error saving package:', error);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
