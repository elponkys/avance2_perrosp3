const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string().alphanum();
const id_categoria = Joi.string().alphanum();
const id_producto = Joi.string().alphanum();

const createCategoria_productoDto = Joi.object({
    id_categoria: id_categoria.required(),
    id_producto: id_producto.required(),

});

const updateCategoria_productoDto = Joi.object({
    id_categoria: id_categoria,
    id_producto: id_producto,
});

const getCategoria_productoId = Joi.object({
  id: id.required(),
});

module.exports = {
    createCategoria_productoDto,
    updateCategoria_productoDto,
    getCategoria_productoId,
};