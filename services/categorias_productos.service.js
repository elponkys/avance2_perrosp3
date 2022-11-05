const boom = require('@hapi/boom');
const Model = require('../models/categoria_producto.model');
class categoria_productoService {
	constructor() {}
	
	async create(data) {
		const model = new Model(data);
		await model.save();
		return data;
	}
	
	async find(limit) {
		let response = {};
		let categories_productsDB = await Model.find();
		
		response['categories_products'] = categories_productsDB
			? categories_productsDB.filter((item, index) => item && index < limit)
			: categories_productsDB;
		
		return response;
	}
	
	async findOne(id) {
		const categoria_producto = await Model.findOne({
			_id: id,
		});
		if(categoria_producto == undefined || categoria_producto == null)
			throw boom.notFound('No se encontró la relación categoria-servicio');
		else if (categoria_producto.length <= 0)
		throw boom.notFound('No se encontró ningún registro');
		return categoria_producto;
	}
	async update(id, changes) {
		let category_product = await Model.findOne({
			_id: id,
		});
		let category_productOriginal = {
			id_categoria: category_product.id_categoria,
			id_producto: category_product.id_producto,
		};
		const { id_categoria, id_producto } = changes;
		category_product.id_categoria = id_categoria;
		category_product.id_producto = id_producto;
		category_product.save();
		
		return {
			original: category_productOriginal,
			actualizado: category_product,
		};
	}
	async delete(id) {
		let category_product = await Model.findOne({
			_id: id,
		});
		const { deletedCount } = await Model.deleteOne({
			_id: id,
		});
		if (deletedCount <= 0)
			throw boom.notFound('El registro seleccionado no existe');
		return category_product;
	}
}

module.exports = categoria_productoService;