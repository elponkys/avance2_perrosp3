const express = require('express');
const router = express.Router();
const Categorias_servicioService = require('../services/categoria_servicio.service');
const validatorHandler = require('../middlewares/validator.handler');
const service = new Categorias_servicioService();
const {
  createCategoria_servicioDto,
  updateCategoria_servicioDto,
  getCategoria_servicioId,
} = require('../dtos/categoria_servicio.dto');

router.get('/', async (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const categorias_servicio = await service.find(limit);
  res.json(categorias_servicio);
});

//STATUS CODE

router.get(
  '/:id',
  validatorHandler(getCategoria_servicioId, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const categoria_servicio = await service.findOne(id);
      res.json({
        success: true,
        message: 'Relación Categoría-Servicio encontrada',
        data: categoria_servicio,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  validatorHandler(createCategoria_servicioDto, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newCategoria_servicio = await service.create(body);
      res.json({
        success: true,
        message: 'Producto creado correctamente',
        data: newCategoria_servicio,
      });
    } catch (error) {
      next(error);
    }
  }
);

//MENSAJES DE ERROR
router.patch(
  '/:id',
  validatorHandler(getCategoria_servicioId, 'params'),
  validatorHandler(updateCategoria_servicioDto, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const categoria_servicio = await service.update(id, body);
      res.json({
        message: 'update',
        data: categoria_servicio,
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
  validatorHandler(getCategoria_servicioId, 'params'),
  validatorHandler(updateCategoria_servicioDto, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const categoria_servicio = await service.updateComplete(id, body);
      res.json({
        message: 'update total',
        data: categoria_servicio,
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
  validatorHandler(getCategoria_servicioId, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const result = await service.delete(id);
    res.json({
      result,
    });
  }
);

module.exports = router;