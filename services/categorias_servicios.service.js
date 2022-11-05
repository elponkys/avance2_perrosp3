const boom = require('@hapi/boom');
const Model = require('../models/categoria_servicio.model');
class categoria_servicioService {
	constructor() {}
	
	async create(data) {
		const model = new Model(data);
		await model.save();
		return data;
	}
	
	async find(limit) {
		let response = {};
		let categories_servicesDB = await Model.find();
		
		response['categories_services'] = categories_servicesDB
			? categories_servicesDB.filter((item, index) => item && index < limit)
			: categories_servicesDB;
		
		return response;
	}
	
	async findOne(id) {
		const categoria_servicio = await Model.findOne({
			_id: id,
		});
		if(categoria_servicio == undefined || categoria_servicio == null)
			throw boom.notFound('No se encontró la relación categoria-servicio');
		else if (categoria_servicio.length <= 0)
		throw boom.notFound('No se encontró ningún registro');
		return categoria_servicio;
	}
	async update(id, changes) {
		let category_service = await Model.findOne({
			_id: id,
		});
		let category_serviceOriginal = {
			id_categoria: category_service.id_categoria,
			id_servicio: category_service.id_servicio,
		};
		const { id_categoria, id_servicio } = changes;
		category_service.id_categoria = id_categoria;
		category_service.id_servicio = id_servicio;
		category_service.save();
		
		return {
			original: category_serviceOriginal,
			actualizado: category_service,
		};
	}
	async delete(id) {
		let category_service = await Model.findOne({
			_id: id,
		});
		const { deletedCount } = await Model.deleteOne({
			_id: id,
		});
		if (deletedCount <= 0)
			throw boom.notFound('El registro seleccionado no existe');
		return category_service;
	}
}

module.exports = categoria_servicioService;