const express = require('express');
const router = express.Router();
const ReseñasService = require('../services/reseñas.service');
const validatorHandler = require('../middlewares/validator.handler');
const service = new ReseñasService();
const {
  createReseñaDto,
  updateReseñaDto,
  getReseñaId,
} = require('../dtos/reseñas.dto');

router.get('/', async (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const reseñas = await service.find(limit);
  res.json(reseñas);
});

//STATUS CODE

router.get(
  '/:id',
  validatorHandler(getReseñaId, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const reseña = await service.findOne(id);
      res.json({
        success: true,
        message: 'Reseña encontrada',
        data: reseña,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  validatorHandler(createReseñaDto, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newReseña = await service.create(body);
      res.json({
        success: true,
        message: 'Producto creado correctamente',
        data: newReseña,
      });
    } catch (error) {
      next(error);
    }
  }
);

//MENSAJES DE ERROR
router.patch(
  '/:id',
  validatorHandler(getReseñaId, 'params'),
  validatorHandler(updateReseñaDto, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const reseña = await service.update(id, body);
      res.json({
        message: 'update',
        data: reseña,
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
  validatorHandler(getReseñaId, 'params'),
  validatorHandler(updateReseñaDto, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const reseña = await service.updateComplete(id, body);
      res.json({
        message: 'update total',
        data: reseña,
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
  validatorHandler(getReseñaId, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const result = await service.delete(id);
    res.json({
      result,
    });
  }
);

module.exports = router;