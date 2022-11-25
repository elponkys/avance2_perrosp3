const boom = require('@hapi/boom');
const Model = require('../models/resenia.model');
class reseniaService {
	constructor() {}
	async create(data) {
		const model = new Model(data);
		await model.save();
		return data;
	}

	async find(filter) {
		let reviewsDB = await Model.find(filter);
		
		if (reviewsDB == undefined || reviewsDB == null)
			throw boom.notFound("errNotFound");
		if (reviewsDB.length <= 0)
			throw boom.notFound("errEmpty");
		
		reviewsDB = reviewsDB.filter((item) => item);
		
		return reviewsDB;
	}

	async findOne(id) {
		const resenia = await Model.findOne({
			_id: id,
		});
		if(resenia == undefined || resenia == null)
			throw boom.notFound('No se encontró la resenia');
		else if (resenia.length <= 0)
		throw boom.notFound('No se encontró ningún registro');
		return resenia;
	}
	async update(id, changes) {
		let review = await Model.findOne({
			_id: id,
		});
		let reviewOriginal = {
			id_usuario: review.id_usuario,
			id_producto: review.id_producto,
			fecha: review.fecha,
			resenia: review.resenia,
		};
		const { id_usuario, id_producto, fecha, resenia } = changes;
		review.id_usuario = id_usuario;
		review.id_producto = id_producto;
		review.fecha = fecha;
		review.resenia = resenia;
		review.save();
		
		return {
			original: reviewOriginal,
			actualizado: review,
		};
	}
	async delete(id) {
		let review = await Model.findOne({
			_id: id,
		});
		const { deletedCount } = await Model.deleteOne({
			_id: id,
		});
		if (deletedCount <= 0)
			throw boom.notFound('El registro seleccionado no existe');
		return review;
	}
}

module.exports = reseniaService;