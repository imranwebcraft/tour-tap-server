const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/jwt', async (req, res) => {
	try {
		const user = req.body;
		const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '1h',
		});
		res.send({ token });
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
