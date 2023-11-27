const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Get models
const Comment = require('../models/comment');

// get all comments by email
router.get('/comments/:email', async (req, res) => {
	try {
		const comments = await Comment.find({ email: req.params.email });
		res.send(comments);
	} catch (error) {
		console.error('Error finding comments:', error);
		res.status(500).send('Internal Server Error');
	}
});

// post a comment

router.post('/comments', async (req, res) => {
	try {
		const newComment = new Comment(req.body);
		await newComment.save();
		res.send('Your comment is saved');
	} catch (error) {
		console.error('Error saving comment:', error);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
