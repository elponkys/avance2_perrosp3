const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const serviceSchema = new Schema({
	id: mongoose.Types.ObjectId,
	id_usuario: String,
	nombre: String,
	fecha: String,
	detalles: String,
	numero: String,
	precio: Number,
});
const model = mongoose.model('servicio', serviceSchema);
module.exports = model;