const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string().alphanum();
const nombre = Joi.string();

const createCategoriaDto = Joi.object({
    nombre: nombre.required(),

});

const updateCategoriaDto = Joi.object({

    nombre: nombre,
});

const getCategoriaId = Joi.object({
  id: id.required(),
});

module.exports = {
    createCategoriaDto,
    updateCategoriaDto,
    getCategoriaId,
};