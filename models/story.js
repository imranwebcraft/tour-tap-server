const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
	title: String,
	image: String,
	date: String,
	authorImage: String,
	authorName: String,
	storyDetails: String,
});

const Story = mongoose.model('Stories', storySchema);
module.exports = Story;
