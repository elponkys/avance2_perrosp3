const express = require('express');
const router = express.Router();
const ServiciosService = require('../services/servicios.service');
const validatorHandler = require('../middlewares/validator.handler');
const faker = require('faker');
const { MULTIMEDIAURL, MULTIMEDIAPROFILEPICS } = require('../consts.json');
const azureStorage = require('azure-storage');
const blobService = azureStorage.createBlobService();
const container = MULTIMEDIAPROFILEPICS.split('/')[0];
const streamifier = require('streamifier');
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
		try {
			const body = req.body;
			const { multimedia } = body;
			if (multimedia) {
				let multis = []
				let index = 0;
				for (const multi of multimedia) {
		  
				  let { name, path, extention } = multi;
		  
				  name = faker.datatype.uuid() + name + "." + extention;
		  
				  let buffer = new Buffer(path, 'base64')
				  var stream = streamifier.createReadStream(buffer);
				  await blobService.createBlockBlobFromStream(container, name, stream, buffer.byteLength, {
					contentType: extention
				  }, async function (err) {
					if (err) {
		  
					  res.json({
						'success': false,
						'message': err
					  });
		  
					} else {
		  
					  const fileURL = `${MULTIMEDIAURL}${MULTIMEDIAPROFILEPICS}${name}`;
					  var obj = {};
					  obj['name'] = name;
					  obj['extention'] = extention;
					  obj['path'] = fileURL;
					  multis[`${index}`] = obj;
					  if (index === multimedia.length - 1) {
						body['multimedia'] = multis;
						const newServicio = await service.create(body);
						res.json({
						  'success': true,
						  'message': "El usuario se ha creado con exito",
						  'Data': newServicio
						});
					  }
					  index++;
					}
		  
				  })
		  
				};
		  
			  }else {
			const newServicio = await service.create(body);
			res.json({
				success: true,
				message: 'Producto creado correctamente',
				data: newServicio,
			});
		}
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