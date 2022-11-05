const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const category_serviceSchema = new Schema({
	id: mongoose.Types.ObjectId,
	id_categoria: String,
	id_servicio: String,
});
const model = mongoose.model('categorias_servicio', category_serviceSchema);
module.exports = model;