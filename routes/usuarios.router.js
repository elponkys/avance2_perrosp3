const express = require('express');
const router = express.Router();
const UsuariosService = require('../services/usuarios.service');
const faker = require('faker');
const validatorHandler = require('../middlewares/validator.handler');
const service = new UsuariosService();
const { MULTIMEDIAURL, MULTIMEDIAPROFILEPICS } = require('../consts.json');
const azureStorage = require('azure-storage');
const blobService = azureStorage.createBlobService();
const container = MULTIMEDIAPROFILEPICS.split('/')[0];
const {
	createUsuarioDto,
	updateUsuarioDto,
	getUsuarioId,
} = require('../dtos/usuario.dto');

router.get('/', async (req, res) => {
	try {
		const { e, p, s } = req.query;
		const filter = {};
		
		Object.assign(filter, {
			isActive: true
		});
		
		if (e) {
			Object.assign(filter, {
				correo: e
			});
		}
		
		if (p) {
			Object.assign(filter, {
				contrasenia: p
			});
		}
		
		if (s) {
			Object.assign(filter, {
				status: s
			});
		}
		
		const users = await service.find(filter)
		res.json({
			'success': true,
			'message': 'Estos son los usuarios encontrados',
			'data': users
		});
	} catch (error) {
		console.log(error);
	}
});

//STATUS CODE

router.get(
	'/:id',
	validatorHandler(getUsuarioId, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const usuario = await service.findOne(id);
			res.json({
				success: true,
				message: 'Usuario encontrado',
				data: usuario,
			});
		} catch (error) {
			next(error);
		}
	}
);
router.post(
	'/',
	validatorHandler(createUsuarioDto, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const { image } = body;
			
			var name = null, path = null, extention = null;
			if (image) {
				({ name, path, extention } = image);
				
				name = faker.datatype.uuid() + name + "." + extention;
				
				let buffer = new Buffer(path, 'base64')
				await blobService.createBlockBlobFromText(container, name, buffer, {
					contentType: extention
				}, async function (err) {
					if (err) {
						res.json({
							'success': false,
							'message': err
						});
					} else {
						const fileURL =`${MULTIMEDIAURL}${MULTIMEDIAPROFILEPICS}${name}`;
						
						body["image"]["path"] = fileURL;
						const user = await service.create(body);
						res.json({
							'success': true,
							'message': "El usuario se ha creado con exito",
							'data': user
						});
					}
				})
			} else {
				const user = await service.create(body);
				
				res.json({
					'success': true,
					'message': "El usuario se ha creado con exito",
					'data': user
				});
			}
			}catch (error) {
			next(error);
		}
	
	}
);

//MENSAJES DE ERROR
router.patch(
	'/:id',
	validatorHandler(getUsuarioId, 'params'),
	validatorHandler(updateUsuarioDto, 'body'),
	async (req, res) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const usuario = await service.update(id, body);
			res.json({
				success: true,
				data: usuario.actualizado,
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
	validatorHandler(getUsuarioId, 'params'),
	validatorHandler(updateUsuarioDto, 'body'),
	async (req, res) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const usuario = await service.update(id, body);
			res.json({
				message: 'update total',
				data: usuario,
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
	validatorHandler(getUsuarioId, 'params'),
	async (req, res) => {
		const { id } = req.params;
		const result = await service.delete(id);
		res.json({
			result,
		});
	}
);

module.exports = router;