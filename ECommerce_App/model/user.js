const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		min: 4,
		max: 255,
		trim: true
	},
	email: {
		type: String,
		required: true,
		min: 6,
		max: 255,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Invalid Email !!');
			}
		}
	},
	password: {
		type: String,
		required: true,
		max: 1024,
		validate(value) {
			if (!validator.isStrongPassword(value)) {
				throw new Error('Password is not strong enough');
			}
		}
	},
	role: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', userSchema);
