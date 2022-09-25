const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string();
const id_usuario = Joi.string().alphanum();
const id_producto = Joi.string().alphanum();
const fecha = Joi.string().min(3).max(50);
const reseña = Joi.string().min(3).max(50);
//const price = Joi.number().integer().min(10);

const createReseñaDto = Joi.object({
    id_usuario: id_usuario.required(),
    id_producto: id_producto.required(),
  fecha: fecha.required(),
  reseña: reseña.required(),
});

const updateReseñaDto = Joi.object({
    id_usuario: id_usuario,
    id_producto: id_producto,
  fecha: fecha,
  reseña: reseña,

});

const getReseñaId = Joi.object({
  id: id.required(),
});

module.exports = {
  createReseñaDto,
  updateReseñaDto,
  getReseñaId,
};