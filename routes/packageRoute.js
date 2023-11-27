const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Package = require('../models/package');

// Get all packages
router.get('/package', async (req, res) => {
	try {
		const packages = await Package.find();
		res.send(packages);
	} catch (error) {
		console.error('Error saving package:', error);
		res.status(500).send('Internal Server Error');
	}
});

// Get a single package
router.get('/package/:id', async (req, res) => {
	try {
		const package = await Package.findById(req.params.id);
		res.send(package);
	} catch (error) {
		console.error('Error finding package:', error);
		res.status(500).send('Internal Server Error');
	}
});

// Get all matched tour packages based on tourType

// The error you're encountering is due to Mongoose attempting to cast the tourType value to an ObjectId, which is the default behavior when using findById or similar methods. To resolve this issue, you can modify your query to use a case-insensitive regular expression for filtering by tourType. This way, you can find documents where the tourType field matches the provided value without casting it to an ObjectId.

router.get('/package/:tourType', async (req, res) => {
	try {
		const tourType = req.params.tourType;
		const filter = { tourType: { $regex: new RegExp(tourType, 'i') } };
		const packages = await Package.find(filter);
		res.send(packages);
	} catch (error) {
		console.error('Error finding package:', error);
		res.status(500).send('Internal Server Error');
	}
});

// Post a package -------> Array of packages
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

//  save all packages ------> Object of packages
router.post('/save-package', async (req, res) => {
	try {
		const packages = req.body;
		for (packageData of packages) {
			const newPackage = new Package(packageData);
			await newPackage.save();
		}
		res.status(200).json({ message: 'Packages saved successfully!' });
	} catch (error) {
		console.error('Error saving packages:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;
