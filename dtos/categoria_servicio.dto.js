const Joi = require('joi');

const id = Joi.string().alphanum();
const id_categoria = Joi.string().alphanum();
const id_servicio = Joi.string().alphanum();

const createCategoria_servicioDto = Joi.object({
	id_categoria: id_categoria.required(),
	id_servicio: id_servicio.required(),

});

const updateCategoria_servicioDto = Joi.object({
	id_categoria: id_categoria,
	id_servicio: id_servicio,
});

const getCategoria_servicioId = Joi.object({
	id: id.required(),
});

module.exports = {
	createCategoria_servicioDto,
	updateCategoria_servicioDto,
	getCategoria_servicioId,
};