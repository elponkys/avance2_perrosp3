const express = require('express');
const router = express.Router();
const Asignacion_imagenService = require('../services/asignacion_imagen.service');
const validatorHandler = require('../middlewares/validator.handler');
const service = new Asignacion_imagenService();
const {
  createAsignacion_imagenDto,
  updateAsignacion_imagenDto,
  getAsignacion_imagenId,
} = require('../dtos/asignacion_imagen.dto');

router.get('/', async (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const asignacion_imagen = await service.find(limit);
  res.json(asignacion_imagen);
});

//STATUS CODE

router.get(
  '/:id',
  validatorHandler(getAsignacion_imagenId, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const asignacion_imagen = await service.findOne(id);
      res.json({
        success: true,
        message: 'Asignación de imagen encontrada',
        data: asignacion_imagen,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  validatorHandler(createAsignacion_imagenDto, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newAsignacion_imagen = await service.create(body);
      res.json({
        success: true,
        message: 'Producto creado correctamente',
        data: newAsignacion_imagen,
      });
    } catch (error) {
      next(error);
    }
  }
);

//MENSAJES DE ERROR
router.patch(
  '/:id',
  validatorHandler(getAsignacion_imagenId, 'params'),
  validatorHandler(updateAsignacion_imagenDto, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const asignacion_imagen = await service.update(id, body);
      res.json({
        message: 'update',
        data: asignacion_imagen,
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
  validatorHandler(getAsignacion_imagenId, 'params'),
  validatorHandler(updateAsignacion_imagenDto, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const asignacion_imagen = await service.updateComplete(id, body);
      res.json({
        message: 'update total',
        data: asignacion_imagen,
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
  validatorHandler(getAsignacion_imagenId, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const result = await service.delete(id);
    res.json({
      result,
    });
  }
);

module.exports = router;