const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string().alphanum();
const cedula = Joi.string().alphanum();
const isActive = Joi.boolean();
const nombre = Joi.string().min(3).max(50);
const fecha = Joi.string().min(3).max(50);
const correo = Joi.string().min(3).max(50);
const contraseña = Joi.string().min(3).max(50);
//const price = Joi.number().integer().min(10);
const image = Joi.string();

const createAdministradorDto = Joi.object({
  isActive: isActive.required(),
  cedula: cedula.required(),
  nombre: nombre.required(),
  fecha: fecha.required(),
  correo: correo.required(),
  contraseña: contraseña.required(),
  image: image.required(),
});

const updateAdministradorDto = Joi.object({
  isActive: isActive,
  cedula: cedula,
  nombre: nombre,
  fecha: fecha,
  correo: correo,
  contraseña: contraseña,
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
