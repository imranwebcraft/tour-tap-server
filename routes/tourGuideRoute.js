const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// imprt models
const TourGuide = require('../models/tourGuide');

// get all tour guide

router.get('/tourGuide', async (req, res) => {
	try {
		const tourGuides = await TourGuide.find();
		res.send(tourGuides);
	} catch (error) {
		console.error('Error saving package:', error);
		res.status(500).send('Internal Server Error');
	}
});

// get signle tour guide
router.get('/tourGuide/:id', async (req, res) => {
	try {
		const tourGuide = await TourGuide.findById(req.params.id);
		res.send(tourGuide);
	} catch (error) {
		console.error('Error saving package:', error);
		res.status(500).send('Internal Server Error');
	}
});

// Post a single tour guide ---> Object of tour guide
router.post('/tourGuide', async (req, res) => {
	try {
		const newTourGuide = new TourGuide(req.body);
		const result = await newTourGuide.save();
		res.send(result);
	} catch (error) {
		console.error('Error saving package:', error);
		res.status(500).send('Internal Server Error');
	}
});

// Save all tour guide ---> Array of tour guide
router.post('/save-tourGuides', async (req, res) => {
	try {
		const tourGuides = req.body;
		const savedTourGuides = await TourGuide.create(tourGuides);
		res.send(savedTourGuides);
	} catch (error) {
		console.error('Error saving tour guides:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;
