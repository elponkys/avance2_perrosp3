const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string();
const id_producto = Joi.string();
const id_imagen = Joi.string();

const createAsignacion_imagenDto = Joi.object({
    id_producto: id_producto.required(),
    id_imagen: id_imagen.required(),

});

const updateAsignacion_imagenDto = Joi.object({
    id_producto: id_producto,
    id_imagen: id_imagen,
});

const getAsignacion_imagenId = Joi.object({
  id: id.required(),
});

module.exports = {
    createAsignacion_imagenDto,
    updateAsignacion_imagenDto,
    getAsignacion_imagenId,
};