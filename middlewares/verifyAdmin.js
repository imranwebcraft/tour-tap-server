const User = require('../models/users');

const verifyAdmin = async (req, res, next) => {
	const tokenEmail = req.user.email;
	const query = { email: tokenEmail };
	const user = await User.findOne(query);
	const isAdmin = user?.role === 'admin';

	if (!isAdmin) {
		return res
			.status(401)
			.send({ message: 'forbiden access from verify admin' });
	}
	next();
};
module.exports = verifyAdmin;
