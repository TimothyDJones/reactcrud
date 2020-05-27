const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const quoteRoute = require('./quote.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
	() => { console.log('Database connected successfully.') },
	err => { console.log('Unable to connect to database: ' + err) }
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/quote', quoteRoute);

app.listen(PORT, function() {
	console.log('Server running on port: ', PORT);
});
