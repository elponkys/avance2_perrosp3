const boom = require('@hapi/boom');
const Model = require('../models/imagen.model');
class imagenService {
	constructor() {}
	async create(data) {
		const model = new Model(data);
		await model.save();
		return data;
	}
	
	async find(limit) {
		let response = {};
		let imagesDB = await Model.find();
		
		response['images'] = imagesDB
			? imagesDB.filter((item, index) => item && index < limit)
			: imagesDB;
		
		return response;
	}
	
	async findOne(id) {
		const imagen = await Model.findOne({
			_id: id,
		});
		if(imagen == undefined || imagen == null)
			throw boom.notFound('No se encontró la imagen');
		else if (imagen.length <= 0)
		throw boom.notFound('No se encontró ningún registro');
		return imagen;
	}
	async update(id, changes) {
		let imageUpdate = await Model.findOne({
			_id: id,
		});
		let imageOriginal = {
			image: imageUpdate.image,
		};
		const { image } = changes;
		imageUpdate.image = image;
		imageUpdate.save();
		
		return {
			original: imageOriginal,
			actualizado: imageUpdate,
		};
	}
	async delete(id) {
		let image = await Model.findOne({
			_id: id,
		});
		const { deletedCount } = await Model.deleteOne({
			_id: id,
		});
		if (deletedCount <= 0)
			throw boom.notFound('El registro seleccionado no existe');
		return image;
	}
}

module.exports = imagenService;