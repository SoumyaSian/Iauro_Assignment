const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
		min: 3,
		max: 255
	},
	price: {
		type: Number,
		required: true
	},
	details: {
		type: String,
		trim: true,
		required: true,
		min: 3,
		max: 255
	},
	addedBy: {
		type: String,
		required: true,
		min: 6,
		max: 255,
		trim: true
	},
	isDisplay: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Product', productSchema);
