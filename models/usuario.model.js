const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
const userSchema = new Schema({
	id: mongoose.Types.ObjectId,
	isActive: Boolean,
	nombre: String,
	fecha: String,
	correo: String,
	contrasenia: String,
	image: Object,
});
const model = mongoose.model('usuario', userSchema);
module.exports = model;