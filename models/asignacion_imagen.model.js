const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const assignation_imageSchema = new Schema({
	id: mongoose.Types.ObjectId,
	id_producto: String,
	id_imagen: String,
});
const model = mongoose.model('asignaciones_imagene', assignation_imageSchema);
module.exports = model;