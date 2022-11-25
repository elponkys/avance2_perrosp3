const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string().alphanum();
const isActive = Joi.boolean();
const nombre = Joi.string().min(3).max(50);
const fecha = Joi.string().min(8).max(10);
const correo = Joi.string().min(6).max(50);
const contrasenia = Joi.string().min(3).max(50);
const servicio = Joi.string().min(3).max(50);
const image = Joi.object().keys({
	name: Joi.string(),
	path: Joi.string(),
	extention: Joi.string().max(13)
});
const status = Joi.number().integer().min(0).max(3);
/*
	Status: 
	0: Usuario normal
	1: Usuario normal con solicitud pendiente
	2: Usuario normal con solicitud aprobada (verificado)
	3: Usuario normal con solicitud rechazada
*/

const createUsuarioDto = Joi.object({
	isActive: isActive.required(),
	nombre: nombre.required(),
	fecha: fecha.required(),
	correo: correo.required(),
	contrasenia: contrasenia.required(),
	servicio: servicio.required(),
	image: image.required(),
	status: status.required(),
});

const updateUsuarioDto = Joi.object({
	isActive: isActive,
	nombre: nombre,
	fecha: fecha,
	correo: correo,
	contrasenia: contrasenia,
	servicio: servicio,
	image: image,
	status: status,
});

const getUsuarioId = Joi.object({
	id: id.required(),
});

module.exports = {
	createUsuarioDto,
	updateUsuarioDto,
	getUsuarioId,
};
