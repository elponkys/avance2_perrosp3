const Joi = require('joi');

const id = Joi.string().alphanum();
const id_usuario = Joi.string().alphanum();
const id_producto = Joi.string().alphanum();
const fecha = Joi.string().min(8).max(10);
const resenia = Joi.string().min(10).max(2500);

const createReseniaDto = Joi.object({
	id_usuario: id_usuario.required(),
	id_producto: id_producto.required(),
	fecha: fecha.required(),
	resenia: resenia.required(),
});

const updateReseniaDto = Joi.object({
	id_usuario: id_usuario,
	id_producto: id_producto,
	fecha: fecha,
	resenia: resenia,
});

const getReseniaId = Joi.object({
	id: id.required(),
});

module.exports = {
	createReseniaDto,
	updateReseniaDto,
	getReseniaId,
};