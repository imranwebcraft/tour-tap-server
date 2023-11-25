const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
	image: String,
	date: String,
	authorImage: String,
	authorName: String,
	storyDetails: String,
});

const Story = mongoose.model('Stories', storySchema);
module.exports = Story;
