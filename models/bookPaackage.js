const mongoose = require('mongoose');

const bookPackageSchema = new mongoose.Schema({
	touristName: String,
	touristEmail: String,
	touristImage: String,

	date: String,
	status: String,

	tourGuideName: String,

	image: String,
	tripTitle: String,
	price: Number,
});

const BookPackage = mongoose.model('BookPackages', bookPackageSchema);
module.exports = BookPackage;
