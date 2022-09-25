const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string();
const image = Joi.string();

const createImagenDto = Joi.object({
    image: image.required(),

});

const updateImagenDto = Joi.object({

  image: image,
});

const getImagenId = Joi.object({
  id: id.required(),
});

module.exports = {
    createImagenDto,
    updateImagenDto,
    getImagenId,
};
