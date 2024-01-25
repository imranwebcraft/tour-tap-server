const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// import models
const Story = require("../models/story");

// Get all stories

router.get("/story", async (req, res) => {
	try {
		const stories = await Story.find();
		res.send(stories);
	} catch (error) {
		console.error("Error saving story:", error);
		res.status(500).send("Internal Server Error");
	}
});

// Get a single story

router.get("/story/:id", async (req, res) => {
	try {
		const story = await Story.findById(req.params.id);
		res.send(story);
	} catch (error) {
		console.error("Error finding story:", error);
		res.status(500).send("Internal Server Error");
	}
});

//post a story ----> array of story

router.post("/story", async (req, res) => {
	try {
		const newStory = new Story(req.body);
		await newStory.save();
		res.send("Story saved");
	} catch (error) {
		console.error("Error saving story:", error);
		res.status(500).send("Internal Server Error");
	}
});

// save all stories ----> object of story

router.post("/save-stories", async (req, res) => {
	try {
		const stories = req.body;
		for (storyData of stories) {
			const newStory = new Story(storyData);
			await newStory.save();
		}
		res.status(200).json({ message: "Stories saved successfully!" });
	} catch (error) {
		console.error("Error saving stories:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = router;
