const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Importing Routes
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const userRoute = require('./routes/users');

//Require and configure dotenv
dotenv.config();

//Initializing the port
const port = process.env.PORT || 3000;

//Connect to DB
mongoose.connect(
	process.env.DB_CONNECT,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	},
	() => {
		console.log('Connected to DB!');
	}
);

//Middleware -  It parses incoming requests with JSON payload
app.use(express.json());

//Route Middlewares for user and product
app.use('/api/user', authRoute);
app.use('/api', userRoute);
app.use('/api/product', productRoute);

app.listen(port, () => console.log(`Server up and running on port ${port}`));
