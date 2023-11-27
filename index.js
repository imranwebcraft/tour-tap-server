const express = require('express');
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

// --------- Get Route ------------//
const packageRoutes = require('./routes/packageRoute');
const tourGuideRoute = require('./routes/tourGuideRoute');
const storyRoute = require('./routes/storyRoute');
const usesrRoute = require('./routes/userRoute');
const wishlistRouter = require('./routes/wishlistRouter');
const bookPackageRouter = require('./routes/bookpackageRoute');
const commentRoute = require('./routes/commentRoute');

// ------------APP Variable-----------//
const app = express();

// -----------Simple Middleeare--------//
app.use(cors());
app.use(express.json());

// --------- Use all Routes------------//
app.use(packageRoutes);
app.use(tourGuideRoute);
app.use(storyRoute);
app.use(usesrRoute);
app.use(wishlistRouter);
app.use(bookPackageRouter);
app.use(commentRoute);

// ------------ MongoDB Database Connection--------------//
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7o1h45b.mongodb.net/?retryWrites=true&w=majority`;

// --------------Simple API Test ----------//
app.get('/', (req, res) => {
	res.send('Tour-Tap server is running....');
});

// handling all (get,post,update,delete.....) unhandled routes
app.all('*', (req, res, next) => {
	const error = new Error(`Can't find ${req.originalUrl} on the server`);
	error.status = 404;
	next(error);
});

app.use((err, _req, res, _next) => {
	res.status(err.status || 500).json({
		message: err.message,
		errors: err.errors,
	});
});

const main = async () => {
	console.log('connecting to database');
	await mongoose.connect(mongoURI, { dbName: process.env.DB_NAME });
	console.log('connected to database');
	app.listen(port, () => {
		console.log(`Tour-Tap server is listening on PORT ${port}`);
	});
};
main();
