const boom = require('@hapi/boom');
const Model = require('../models/categoria.model');
class categoriaService {
	constructor() {}
	
	async create(data) {
		const model = new Model(data);
		await model.save();
		return data;
	}
	
	async find(limit) {
		let response = {};
		let categoriesDB = await Model.find();
		
		response['categories'] = categoriesDB
			? categoriesDB.filter((item, index) => item && index < limit)
			: categoriesDB;
		
		return response;
	}
	
	async findOne(id) {
		const categoria = await Model.findOne({
			_id: id,
		});
		if(categoria == undefined || categoria == null)
			throw boom.notFound('No se encontró la categoria');
		else if (categoria.length <= 0)
		throw boom.notFound('No se encontró ningún registro');
		return categoria;
	}
	async update(id, changes) {
		let category = await Model.findOne({
			_id: id,
		});
		let categoryOriginal = {
			nombre: category.nombre,
		};
		const { nombre } = changes;
		category.nombre = nombre;
		category.save();
		
		return {
			original: categoryOriginal,
			actualizado: category,
		};
	}
	async delete(id) {
		let category = await Model.findOne({
			_id: id,
		});
		const { deletedCount } = await Model.deleteOne({
			_id: id,
		});
		if (deletedCount <= 0)
			throw boom.notFound('El registro seleccionado no existe');
		return category;
	}
}

module.exports = categoriaService;
