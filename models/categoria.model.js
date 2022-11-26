const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const categorySchema = new Schema({
	id: mongoose.Types.ObjectId,
	nombre: String,
});
const model = mongoose.model('categoria', categorySchema);
module.exports = model;