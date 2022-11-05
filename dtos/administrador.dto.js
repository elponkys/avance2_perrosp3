const Joi = require('joi');

const id = Joi.string().alphanum();
const isActive = Joi.boolean();
const cedula = Joi.string().alphanum();
const nombre = Joi.string().min(3).max(50);
const fecha = Joi.string().min(8).max(10);
const correo = Joi.string().min(3).max(50);
const contrasenia = Joi.string().min(3).max(50);
const image = Joi.string();

const createAdministradorDto = Joi.object({
	isActive: isActive.required(),
	cedula: cedula.required(),
	nombre: nombre.required(),
	fecha: fecha.required(),
	correo: correo.required(),
	contrasenia: contrasenia.required(),
	image: image.required(),
});

const updateAdministradorDto = Joi.object({
	isActive: isActive,
	cedula: cedula,
	nombre: nombre,
	fecha: fecha,
	correo: correo,
	contrasenia: contrasenia,
	image: image,
});

const getAdministradorId = Joi.object({
	id: id.required(),
});

module.exports = {
	createAdministradorDto,
	updateAdministradorDto,
	getAdministradorId,
};
