const boom = require('@hapi/boom');
const Model = require('../models/servicio.model');
class servicioService {
	constructor() {}
	async create(data) {
		const model = new Model(data);
		await model.save();
		return data;
	}
	
	async find(limit) {
		let response = {};
		let servicesDB = await Model.find();
		
		response['services'] = servicesDB
			? servicesDB.filter((item, index) => item && index < limit)
			: servicesDB;
		
		return response;
	}
	
	async findOne(id) {
		const servicio = await Model.findOne({
			_id: id,
		});
		if(servicio == undefined || servicio == null)
			throw boom.notFound('No se encontró el servicio');
		else if (servicio.length <= 0)
		throw boom.notFound('No se encontró ningún registro');
		return servicio;
	}
	async update(id, changes) {
		let service = await Model.findOne({
			_id: id,
		});
		let serviceOriginal = {
			id_usuario: service.id_usuario,
			nombre: service.nombre,
			fecha: service.fecha,
			detalles: service.detalles,
			numero: service.numero,
			precio: service.precio,
		};
		const { id_usuario, nombre, fecha, detalles, numero, precio } = changes;
		service.id_usuario = id_usuario;
		service.nombre = nombre;
		service.fecha = fecha;
		service.detalles = detalles;
		service.numero = numero;
		service.precio = precio;
		service.save();
		
		return {
			original: serviceOriginal,
			actualizado: service,
		};
	}
	
	async delete(id) {
		let service = await Model.findOne({
			_id: id,
		});
		const { deletedCount } = await Model.deleteOne({
			_id: id,
		});
		if (deletedCount <= 0)
			throw boom.notFound('El registro seleccionado no existe');
		return service;
	}
}

module.exports = servicioService;