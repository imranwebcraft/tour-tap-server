const mongoose = require('mongoose');

const tourGuideSchema = new mongoose.Schema({
	name: String,
	image: String,
	email: String,
	phone: Number,
	education: String,
});

const TourGuide = mongoose.model('TourGuides', tourGuideSchema);

module.exports = TourGuide;
