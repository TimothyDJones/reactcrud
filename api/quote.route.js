const express = require('express');
const quoteRoutes = express.Router();

// Require the Quote model in our routes module
let Quote = require('./quote.model');

// Define 'store' route
quoteRoutes.route('/add').post(function (req, res) {
	let quote = new Quote(req.body);
	quote.save()
		.then(quote => {
			res.status(200).json({'quote': 'Quote added successfully.'});
		})
		.catch(err => {
			res.status(400).send("Unable to save quote to database.");
		});
});

// Define 'get data' (index/listing) route
quoteRoutes.route('/').get(function (req, res) {
	Quote.find(function(err, quotes) {
		if (err) {
			console.log(err);
		} else {
			res.json(quotes);
		}
	});
});

// Define 'update' route
quoteRoutes.route('/update/:id').post(function (req, res) {
	Quote.findById(req.params.id, function(err, quote) {
		if (!quote)
			res.status(404).send("Quote not found.");
		else {
			quote.quote = req.body.quote;
			quote.author = req.body.author;
			quote.tags = req.body.tags;

			quote.save().then(quote => {
				res.json('Quote updated successfully.');
			})
			.catch(err => {
				res.status(400).send("Unable to update quote.");
			});
		}
	});
});

// Define 'delete/remove/destroy' route
quoteRoutes.route('/delete/:id').get(function (req, res) {
	Quote.findByIdAndRemove({_id: req.params.id}, function(err, quote) {
		if (err) res.json(err);
		else res.json('Successfully removed quote.');
	});
});

module.exports = quoteRoutes;
