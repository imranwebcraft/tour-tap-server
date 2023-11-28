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

// get all matching booking data based on email address

router.get('/book-package/:email', async (req, res) => {
	try {
		const packages = await BookPackage.find({
			touristEmail: req.params.email,
		});
		res.send(packages);
	} catch (error) {
		console.error('Error saving package:', error);
		res.status(500).send('Internal Server Error');
	}
});

//delete a specific booking data by id
router.delete('/book-package/:id', async (req, res) => {
	const packageId = req.params.id;
	try {
		const deletedPackage = await BookPackage.findByIdAndDelete(packageId);
		res.send('Delete Successfull!');
		if (!deletedPackage) {
			return res.status(404).json({ message: 'Package not found' });
		}
	} catch (error) {
		console.error('Error deleting package:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

// get specific booking data based on id and updated booking

router.patch('/book-package/:id', async (req, res) => {
	const packageId = req.params.id;
	const newStatus = req.body.status;
	try {
		const updatedPackage = await BookPackage.findByIdAndUpdate(
			packageId,
			{ $set: { status: newStatus } },
			{ new: true, useFindAndModify: false }
		);
		res.send(updatedPackage);
		if (!updatedPackage) {
			return res.status(404).json({ message: 'Package not found' });
		}
	} catch (error) {
		console.error('Error updating package:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

// get matched tour guide by name
router.get('/book-package/name/:name', async (req, res) => {
	try {
		const tourGuides = await BookPackage.find({
			tourGuideName: req.params.name,
		});
		res.send(tourGuides);
	} catch (error) {
		console.error('Error saving package:', error);
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
