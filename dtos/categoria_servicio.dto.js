const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string();
const id_categoria = Joi.string();
const id_servicio = Joi.string();

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