const router = require('express').Router();
const verify = require('../routes/verifyToken');
const User = require('../model/user');

//Only admin can delete the userDetails
router.delete('/deleteUser/:userId', verify, async (req, res) => {
	try {
		const adminExist = await User.findOne({ _id: req.body.adminId });
		if (!adminExist) {
			return res.status(400).json({ results: null, message: 'Admin is not exist' });
		}

		const userDetails = await User.findById(req.params.userId);
		if (!userDetails) {
			return res.status(400).json({
				results: null,
				message: 'User Not Found'
			});
		}

		if (adminExist.role !== 'admin') {
			return res.status(400).json({ results: null, message: 'User is not an admin' });
		} else {
			const removedUser = await User.findByIdAndRemove(req.params.userId);
			res.json({
				results: null,
				message: 'User Deleted Successully'
			});
		}
	} catch (err) {
		res.status(400).json({
			results: err,
			message: err.message
		});
	}
});

//Only admin can update the userDetails
router.put('/updateUser/:userId/:adminId', verify, async (req, res) => {
	try {
		const updates = req.body;
		const options = { new: true };

		const userDetails = await User.findById(req.params.userId);
		if (!userDetails) {
			return res.status(400).json({
				results: null,
				message: 'User Not Found'
			});
		}

		const adminExist = await User.findOne({ _id: req.params.adminId });
		if (!adminExist) {
			return res.status(400).json({ results: null, message: 'Admin is not exist' });
		}
		if (adminExist.role !== 'admin') {
			return res.status(400).json({ results: null, message: 'User is not an admin' });
		} else {
			res.json({
				results: await User.findByIdAndUpdate(req.params.userId, updates, options),
				message: 'User Data Updated Successully'
			});
		}
	} catch (err) {
		res.status(400).json({
			results: err,
			message: err.message
		});
	}
});

module.exports = router;
