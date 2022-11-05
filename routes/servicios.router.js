const express = require('express');
const router = express.Router();
const ServiciosService = require('../services/servicios.service');
const validatorHandler = require('../middlewares/validator.handler');
const service = new ServiciosService();
const {
	createServicioDto,
	updateServicioDto,
	getServicioId,
} = require('../dtos/servicio.dto');

router.get('/', async (req, res) => {
	const { size } = req.query;
	const limit = size || 10;
	const servicios = await service.find(limit);
	res.json(servicios);
});

//STATUS CODE

router.get(
	'/:id',
	validatorHandler(getServicioId, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const servicio = await service.findOne(id);
			res.json({
				success: true,
				message: 'Servicio encontrado',
				data: servicio,
			});
		} catch (error) {
			next(error);
		}
	}
);
router.post(
	'/',
	validatorHandler(createServicioDto, 'body'),
	async (req, res, next) => {
		const body = req.body;
		try {
			const newServicio = await service.create(body);
			res.json({
				success: true,
				message: 'Producto creado correctamente',
				data: newServicio,
			});
		} catch (error) {
			next(error);
		}
	}
);

//MENSAJES DE ERROR
router.patch(
	'/:id',
	validatorHandler(getServicioId, 'params'),
	validatorHandler(updateServicioDto, 'body'),
	async (req, res) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const servicio = await service.update(id, body);
			res.json({
				message: 'update',
				data: servicio,
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
	validatorHandler(getServicioId, 'params'),
	validatorHandler(updateServicioDto, 'body'),
	async (req, res) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const servicio = await service.updateComplete(id, body);
			res.json({
				message: 'update total',
				data: servicio,
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
	validatorHandler(getServicioId, 'params'),
	async (req, res) => {
		const { id } = req.params;
		const result = await service.delete(id);
		res.json({
			result,
		});
	}
);

module.exports = router;