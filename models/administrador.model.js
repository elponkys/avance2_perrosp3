const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const adminSchema = new Schema({
	id: mongoose.Types.ObjectId,
	isActive: Boolean,
	cedula: String,
	nombre: String,
	fecha: String,
	correo: String,
	contrasenia: String,
	image: Object,
});
const model = mongoose.model('administradore', adminSchema);
module.exports = model;