const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const productSchema = new Schema({
	id: mongoose.Types.ObjectId,
	stock: Number,
	id_usuario: String,
	numero: String,
	nombre: String,
	fecha: String,
	precio: Number,
	detalles: String,
	estado: String,
});
const model = mongoose.model('producto', productSchema);
module.exports = model;