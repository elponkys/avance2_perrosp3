const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const category_productSchema = new Schema({
	id: mongoose.Types.ObjectId,
	id_categoria: String,
	id_producto: String,
});
const model = mongoose.model('categorias_producto', category_productSchema);
module.exports = model;