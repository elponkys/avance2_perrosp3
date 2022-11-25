const express = require('express');
const router = express.Router();
const ReseniasService = require('../services/resenias.service');
const validatorHandler = require('../middlewares/validator.handler');
const service = new ReseniasService();
const {
	createReseniaDto,
	updateReseniaDto,
	getReseniaId,
} = require('../dtos/resenia.dto');

router.get('/', async (req, res) => {
	try {
		const { p } = req.query;
		const filter = {};
		
		Object.assign(filter, {
			id_producto: p
		});
		
		const resenias = await service.find(filter);
		res.json({
			'success': true,
			'message': 'Estas son las resenias encontradas',
			'data': resenias
		});
	} catch (error) {
		console.log(error);
	}
});

//STATUS CODE

router.get(
	'/:id',
	validatorHandler(getReseniaId, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const resenia = await service.findOne(id);
			res.json({
				success: true,
				message: 'Resenia encontrada',
				data: resenia,
			});
		} catch (error) {
			next(error);
		}
	}
);
router.post(
	'/',
	validatorHandler(createReseniaDto, 'body'),
	async (req, res, next) => {
		const body = req.body;
		try {
			const newResenia = await service.create(body);
			res.json({
				success: true,
				message: 'Producto creado correctamente',
				data: newResenia,
			});
		} catch (error) {
			next(error);
		}
	}
);

//MENSAJES DE ERROR
router.patch(
	'/:id',
	validatorHandler(getReseniaId, 'params'),
	validatorHandler(updateReseniaDto, 'body'),
	async (req, res) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const resenia = await service.update(id, body);
			res.json({
				message: 'update',
				data: resenia,
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
	validatorHandler(getReseniaId, 'params'),
	validatorHandler(updateReseniaDto, 'body'),
	async (req, res) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const resenia = await service.updateComplete(id, body);
			res.json({
				message: 'update total',
				data: resenia,
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
	validatorHandler(getReseniaId, 'params'),
	async (req, res) => {
		const { id } = req.params;
		const result = await service.delete(id);
		res.json({
			'success': true,
			'message': 'Reseña eliminada correctamente',
			'data': result
		});
	}
);

module.exports = router;