const mongoose = require('mongoose');

const tourGuideSchema = new mongoose.Schema({
	name: String,
	image: String,
	email: String,
	education: String,
	skills: [
		{
			name: String,
			level: String,
		},
	],
	workExperience: [
		{
			company: String,
			position: String,
			year: String,
		},
	],
});

const TourGuide = mongoose.model('TourGuides', tourGuideSchema);

module.exports = TourGuide;
