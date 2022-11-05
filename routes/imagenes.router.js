const express = require('express');
const router = express.Router();
const ImagenesService = require('../services/imagenes.service');
const validatorHandler = require('../middlewares/validator.handler');
const service = new ImagenesService();
const {
	createImagenDto,
	updateImagenDto,
	getImagenId,
} = require('../dtos/imagen.dto');

router.get('/', async (req, res) => {
	const { size } = req.query;
	const limit = size || 10;
	const imagenes = await service.find(limit);
	res.json(imagenes);
});

//STATUS CODE

router.get(
	'/:id',
	validatorHandler(getImagenId, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const imagen = await service.findOne(id);
			res.json({
				success: true,
				message: 'Imagen encontrada',
				data: imagen,
			});
		} catch (error) {
			next(error);
		}
	}
);
router.post(
	'/',
	validatorHandler(createImagenDto, 'body'),
	async (req, res, next) => {
		const body = req.body;
		try {
			const newImagen = await service.create(body);
			res.json({
				success: true,
				message: 'Imagen subida correctamente',
				data: newImagen,
			});
		} catch (error) {
			next(error);
		}
	}
);

//MENSAJES DE ERROR
router.patch(
	'/:id',
	validatorHandler(getImagenId, 'params'),
	validatorHandler(updateImagenDto, 'body'),
	async (req, res) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const imagen = await service.update(id, body);
			res.json({
				message: 'update',
				data: imagen,
				id,
			});
		} catch (error) {
			res.status(404).json({
				message: error.message,
			});
		}
	}
);

router.put(
	'/:id',
	validatorHandler(getImagenId, 'params'),
	validatorHandler(updateImagenDto, 'body'),
	async (req, res) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const imagen = await service.updateComplete(id, body);
			res.json({
				message: 'update total',
				data: imagen,
				id,
			});
		} catch (error) {
			res.status(404).json({
				message: error.message,
			});
		}
	}
);

router.delete(
	'/:id',
	validatorHandler(getImagenId, 'params'),
	async (req, res) => {
		const { id } = req.params;
		const result = await service.delete(id);
		res.json({
			result,
		});
	}
);

module.exports = router;