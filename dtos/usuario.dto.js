const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string().alphanum();
const isActive = Joi.boolean();
const nombre = Joi.string().min(3).max(50);
const fecha = Joi.string().min(8).max(10);
const correo = Joi.string().min(6).max(50);
const contrasenia = Joi.string().min(3).max(50);
const image = Joi.object().keys({
	name: Joi.string(),
	path: Joi.string(),
	extention: Joi.string().max(13)
  });

const createUsuarioDto = Joi.object({
	isActive: isActive.required(),
	nombre: nombre.required(),
	fecha: fecha.required(),
	correo: correo.required(),
	contrasenia: contrasenia.required(),
	image: image.required(),
});

const updateUsuarioDto = Joi.object({
	isActive: isActive,
	nombre: nombre,
	fecha: fecha,
	correo: correo,
	contrasenia: contrasenia,
	image: image,
});

const getUsuarioId = Joi.object({
	id: id.required(),
});

module.exports = {
	createUsuarioDto,
	updateUsuarioDto,
	getUsuarioId,
};
