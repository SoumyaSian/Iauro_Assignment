const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('../routes/verifyToken');

//Sign Up as an admin or user
router.post('/signup', async (req, res) => {
	try {
		//Checking if user is already in the database
		const emailExist = await User.findOne({ email: req.body.email });
		if (emailExist) {
			return res.status(400).json({
				results: null,
				message: 'Email already exists'
			});
		}

		//Hash Passwords
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		//Create a new user
		const user = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
			role: req.body.role
		});
		const savedUser = await user.save();
		res.json({
			results: user._id,
			message: 'User Signed up successfully'
		});
	} catch (err) {
		res.status(400).json({
			results: null,
			message: 'Internal Server Error'
		});
	}
});

//Login
router.post('/signin', async (req, res) => {
	try {
		//Checking if the email exists
		const userExist = await User.findOne({ email: req.body.email });
		if (!userExist) {
			return res.status(400).json({ results: null, message: 'Entered email is not exist' });
		}

		//Comparing the user entered password with saved password
		const validPwd = await bcrypt.compare(req.body.password, userExist.password);
		if (!validPwd) {
			return res.status(400).json({ results: null, message: 'Invalid Password' });
		}

		//Create and assign a token
		const token = jwt.sign({ _id: userExist._id }, process.env.ACCESS_TOKEN_SECRET);
		res.header('Authorization', token).json({ results: token, message: 'Successfully Logged In' });
	} catch (err) {
		res.status(400).json({
			results: null,
			message: 'Internal Server Error'
		});
	}
});

module.exports = router;
