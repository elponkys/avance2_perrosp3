const boom = require('@hapi/boom');
const Model = require('../models/asignacion_imagen.model');
class asignacion_imagenService {
	constructor() {}
	
	async create(data) {
		const model = new Model(data);
		await model.save();
		return data;
	}
	
	async find(limit) {
		let response = {};
		let assignations_imagesDB = await Model.find();
		
		response['asignations_images'] = assignations_imagesDB
			? assignations_imagesDB.filter((item, index) => item && index < limit)
			: assignations_imagesDB;
		
		return response;
	}
	
	async findOne(id) {
		const asignacion_imagen = await Model.findOne({
			_id: id,
		});
		if(asignacion_imagen == undefined || asignacion_imagen == null)
			throw boom.notFound('No se encontró la asignación de imagen');
		else if (asignacion_imagen.length <= 0)
		throw boom.notFound('No se encontró ningún registro');
		return asignacion_imagen;
	}
	async update(id, changes) {
		let assignation_image = await Model.findOne({
			_id: id,
		});
		let assignation_imageOriginal = {
			id_producto: assignation_image.id_categoria,
			id_imagen: assignation_image.id_imagen,
		};
		const { id_producto, id_imagen } = changes;
		assignation_image.id_producto = id_producto;
		assignation_image.id_imagen = id_imagen;
		assignation_image.save();
		
		return {
			original: assignation_imageOriginal,
			actualizado: assignation_image,
		};
	}
	async delete(id) {
		let assignation_image = await Model.findOne({
			_id: id,
		});
		const { deletedCount } = await Model.deleteOne({
			_id: id,
		});
		if (deletedCount <= 0)
			throw boom.notFound('El registro seleccionado no existe');
		return assignation_image;
	}
}

module.exports = asignacion_imagenService;