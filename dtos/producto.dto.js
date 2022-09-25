const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string();
const Stock = Joi.number().integer().min(3);
const id_usuario = Joi.string().alphanum();
const numero = Joi.string().alphanum();
const nombre = Joi.string().min(3).max(50);
const fecha = Joi.string().min(3).max(50);
const precio = Joi.number().integer().min(2);
const detalles = Joi.string();
const estado = Joi.string();

const createProductoDto = Joi.object({
    Stock: Stock.required(),
    id_usuario: id_usuario.required(),
    numero: numero.required(),
    nombre: nombre.required(),
    fecha: fecha.required(),
    precio: precio.required(),
    detalles: detalles.required(),
    estado: estado.required(),
});

const updateProductoDto = Joi.object({
    Stock: Stock,
    id_usuario: id_usuario,
    numero: numero,
    nombre: nombre,
    fecha: fecha,
    precio: precio,
    detalles: detalles,
    estado: estado,
});

const getProductoId = Joi.object({
  id: id.required(),
});

module.exports = {
    createProductoDto,
    updateProductoDto,
    getProductoId,
};