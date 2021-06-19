const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const validator = require('express-validator');
const app = express();

// const productRoute = require('./src/route/product.route');
const userRoute = require('./src/route/user.route');

app.set('view engine', 'pug');
app.set('views','./src/view');
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(validator());
app.use(express.static('./src/public'));

const PORT = process.env.PORT || 3000;
const URL = process.env.MONGO_URL || 'mongodb+srv://dongsinhho:Sinhlolfo3123@cluster0.4gzsl.mongodb.net/lab4';

app.get('/', (req, res) => {
	res.render('start');
    // res.status(200).json({ message: 'SUCCESS' });
})

// app.use('/product', productRoute);
app.use('/user', userRoute);

mongoose
	.connect(URL, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then(() =>
		app.listen(PORT, () => {
			console.log(`Server is running on PORT: ${PORT}`);
		})
	)
	.catch((error) => {
		console.log(error.message);
	});
