const mongoose = require('mongoose');
const packageSchema = new mongoose.Schema({
	image: String,
	tourType: String,
	tripTitle: String,
	price: Number,
	tourDetails: String,
});
const Package = mongoose.model('Packages', packageSchema);
module.exports = Package;
