const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const imageSchema = new Schema({
	id: mongoose.Types.ObjectId,
	image: String,
});
const model = mongoose.model('imagene', imageSchema);
module.exports = model;