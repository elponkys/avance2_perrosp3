const Joi = require('joi');

const id = Joi.string().alphanum();
const nombre = Joi.string().alphanum();

const createCategoriaDto = Joi.object({
	nombre: nombre.required(),
});

const updateCategoriaDto = Joi.object({
	nombre: nombre,
});

const getCategoriaId = Joi.object({
	id: id.required(),
});

module.exports = {
	createCategoriaDto,
	updateCategoriaDto,
	getCategoriaId,
};