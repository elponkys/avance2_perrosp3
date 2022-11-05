const Joi = require('joi');

const id = Joi.string().alphanum();
const id_producto = Joi.string().alphanum();
const id_imagen = Joi.string().alphanum();

const createAsignacion_imagenDto = Joi.object({
	id_producto: id_producto.required(),
	id_imagen: id_imagen.required(),
});

const updateAsignacion_imagenDto = Joi.object({
	id_producto: id_producto,
	id_imagen: id_imagen,
});

const getAsignacion_imagenId = Joi.object({
	id: id.required(),
});

module.exports = {
	createAsignacion_imagenDto,
	updateAsignacion_imagenDto,
	getAsignacion_imagenId,
};