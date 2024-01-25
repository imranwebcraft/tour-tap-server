require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
	if (!req.headers?.authorization) {
		return res.status(401).send({ message: "unAuthorize access" });
	}
	// if there, get the token
	const token = req.headers?.authorization.split(" ")[1];
	jwt.verify(token, process.env.ACCESS_TOKE_SECRET, (err, decoded) => {
		if (err) {
			res.status(401).send({ message: "unAuthorize access" });
		}
		req.user = decoded;
		next();
	});
};
module.exports = verifyToken;
