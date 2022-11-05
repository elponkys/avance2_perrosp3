const express = require('express');
const router = express.Router();
const AdministradoresService = require('../services/administradores.service');
const validatorHandler = require('../middlewares/validator.handler');
const service = new AdministradoresService();
const {
	createAdministradorDto,
	updateAdministradorDto,
	getAdministradorId,
} = require('../dtos/administrador.dto');

router.get('/', async (req, res) => {
	const { size } = req.query;
	const limit = size || 10;
	const administradores = await service.find(limit);
	res.json(administradores);
});

//STATUS CODE

router.get(
	'/:id',
	validatorHandler(getAdministradorId, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const administradores = await service.findOne(id);
			res.json({
				success: true,
				message: 'Administrador encontrado',
				data: administradores,
			});
		} catch (error) {
			next(error);
		}
	}
);
router.post(
	'/',
	validatorHandler(createAdministradorDto, 'body'),
	async (req, res, next) => {
		const body = req.body;
		try {
			const newAdministrador = await service.create(body);
			res.json({
				success: true,
				message: 'Administrador creado correctamente',
				data: newAdministrador,
			});
		} catch (error) {
			next(error);
		}
	}
);

//MENSAJES DE ERROR
router.patch(
	'/:id',
	validatorHandler(getAdministradorId, 'params'),
	validatorHandler(updateAdministradorDto, 'body'),
	async (req, res) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const administradores = await service.update(id, body);
			res.json({
				message: 'update',
				data: administradores,
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
	validatorHandler(getAdministradorId, 'params'),
	validatorHandler(updateAdministradorDto, 'body'),
	async (req, res) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const administrador = await service.update(id, body);
			res.json({
				message: 'update total',
				data: administrador,
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
	validatorHandler(getAdministradorId, 'params'),
	async (req, res) => {
		const { id } = req.params;
		const result = await service.delete(id);
		res.json({
			result,
		});
	}
);

module.exports = router;