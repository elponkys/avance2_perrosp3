const Joi = require('joi');

const id = Joi.string().alphanum();
const id_usuario = Joi.string().alphanum();
const nombre = Joi.string().min(3).max(50);
const publicacion = Joi.string().min(3).max(50);
const pais = Joi.string().min(3).max(50);
const estado = Joi.string().min(3).max(50);
const ciudad = Joi.string().min(3).max(50);
const fecha = Joi.string().min(8).max(10);
const detalles = Joi.string().min(3).max(1000);
const numero = Joi.string().alphanum();
const precio = Joi.number().integer().min(10);
const multimedia = Joi.array().items(
	Joi.object().keys({
	  name: Joi.string(),
	  path: Joi.string(),
	  extention: Joi.string().max(6)
	})
  );

const createServicioDto = Joi.object({
	id_usuario: id_usuario.required(),
	nombre: nombre.required(),
	publicacion: publicacion.required(),
	pais: pais.required(),
	estado: estado.required(),
	ciudad: ciudad.required(),
	fecha: fecha.required(),
	detalles: detalles.required(),
	numero: numero.required(),
	precio: precio.required(),
	multimedia: multimedia.required(),
});

const updateServicioDto = Joi.object({
	id_usuario: id_usuario,
	nombre: nombre,
	publicacion: publicacion,
	pais: pais,
	estado: estado,
	ciudad: ciudad,
	fecha: fecha,
	detalles: detalles,
	numero: numero,
	precio: precio,
	multimedia: multimedia,
});

const getServicioId = Joi.object({
	id: id.required(),
});

module.exports = {
	createServicioDto,
	updateServicioDto,
	getServicioId,
};
