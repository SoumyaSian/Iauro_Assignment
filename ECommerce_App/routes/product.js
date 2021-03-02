const router = require('express').Router();
const Product = require('../model/product');
const User = require('../model/user');
const verify = require('../routes/verifyToken');
const { use } = require('./auth');

//To add the products
router.post('/addProduct', verify, async (req, res) => {
	//Checking if added user is already in the database
	const userExist = await User.findOne({ _id: req.body.addedBy });
	if (!userExist) {
		return res.status(400).json({ results: null, message: 'User not found' });
	}

	//Add a new product
	const product = new Product({
		name: req.body.name,
		price: req.body.price,
		details: req.body.details,
		addedBy: req.body.addedBy
	});

	try {
		res.json({
			results: await product.save(),
			message: 'Product is added successfully'
		});
	} catch (err) {
		res.status(400).json({
			results: null,
			message: 'Failed to add a product'
		});
	}
});

//To display all the products
router.get('/allProducts', verify, async (req, res) => {
	try {
		res.json({
			results: await Product.find(),
			message: 'Succefully fetched all the product'
		});
	} catch (err) {
		res.status(400).json({
			results: null,
			message: 'Failed to get data'
		});
	}
});

//Update the product details
//Admin can update all the product
//User can update only his own products

router.put('/update/:productId', verify, async (req, res) => {
	try {
		const updates = req.body;
		const options = { new: true };

		//Check whether user exist in the DB
		const userExist = await User.findOne({ _id: req.body.addedBy });
		if (!userExist)
			return res.status(400).json({
				results: null,
				message: 'User Not Found'
			});

		const productDetails = await Product.findById(req.params.productId);
		if (userExist.role === 'admin') {
			res.json({
				results: await Product.findByIdAndUpdate(req.params.productId, updates, options),
				message: 'Product Updated successfully'
			});
		} else {
			if (productDetails.addedBy === req.body.addedBy) {
				res.json({
					results: await Product.findByIdAndUpdate(req.params.productId, updates, options),
					message: 'User Updated his product successfully'
				});
			} else {
				res.json({
					results: null,
					message: 'Neither an admin nor a owner of the product'
				});
			}
		}
	} catch (err) {
		res.status(400).json({
			results: null,
			message: 'Failed to get data'
		});
	}
});

//Delete the product details
//Admin can Delete all the product
//User can Delete only his own products

router.delete('/delete/:productId', verify, async (req, res) => {
	try {
		const userExist = await User.findOne({ _id: req.body.addedBy });
		if (!userExist)
			return res.status(400).json({
				results: null,
				message: 'User Not Found'
			});

		const productDetails = await Product.findById(req.params.productId);

		if (userExist.role === 'admin') {
			const removedProduct = await Product.remove(productDetails);
			res.json({
				results: null,
				message: 'Succefully Deleted the product'
			});
		} else {
			if (productDetails.addedBy === req.body.addedBy) {
				const removedProduct = await Product.remove(productDetails);
				res.json({
					results: null,
					message: 'User has deleted his product successfully'
				});
			} else {
				res.json({
					results: null,
					message: 'Neither an admin nor a owner of the product'
				});
			}
		}
	} catch (err) {
		res.status(400).json({
			results: null,
			message: 'Failed to get data'
		});
	}
});

router.put('/displayProducts/:adminId/:productId', verify, async (req, res) => {
	try {
		const updates = req.body;
		const options = { new: true };

		const adminExist = await User.findOne({ _id: req.params.adminId });
		if (!adminExist) {
			return res.status(400).json({ results: null, message: 'Admin is not exist' });
		}
		if (adminExist.role !== 'admin') {
			return res.status(400).json({ results: null, message: 'User is not an admin' });
		} else {
			res.json({
				results: await Product.findByIdAndUpdate(req.params.productId, updates, options),
				message: 'Above products can be displayed'
			});
		}
	} catch (err) {
		res.status(400).json({
			results: null,
			message: 'Failed to get data'
		});
	}
});

module.exports = router;
