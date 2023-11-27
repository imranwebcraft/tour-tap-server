const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	authorName: String,
	authorImage: String,
	authorEmail: String,
	email: String,
	comment: String,
	rating: Number,
});

const Comment = mongoose.model('Comments', commentSchema);
module.exports = Comment;
