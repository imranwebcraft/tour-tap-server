const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
	email: String,
	image: String,
	tourType: String,
	tripTitle: String,
	price: Number,
	tourDetails: String,
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
