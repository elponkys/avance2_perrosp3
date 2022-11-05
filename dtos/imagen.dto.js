const Joi = require('joi');

const id = Joi.string().alphanum();
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
