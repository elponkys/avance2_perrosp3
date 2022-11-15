const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const serviceSchema = new Schema({
	id: mongoose.Types.ObjectId,
	id_usuario: String,
	nombre: String,
	publicacion: String,
	pais: String,
	estado: String,
	ciudad: String,
	fecha: String,
	detalles: String,
	numero: String,
	precio: Number,
	multimedia: Array
});
const model = mongoose.model('servicio', serviceSchema);
module.exports = model;