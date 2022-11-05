const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const reviewSchema = new Schema({
	id: mongoose.Types.ObjectId,
	id_usuario: String,
	id_producto: String,
	fecha: String,
	resenia: String,
});
const model = mongoose.model('resenia', reviewSchema);
module.exports = model;