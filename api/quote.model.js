const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Quote
let Quote = new Schema({
	quote: {
		type: String
	},
	author: {
		type: String
	},
	tags: {
		type: String
	}
}, {
	collection: 'quote'
});

module.exports = mongoose.model('Quote', Quote);
