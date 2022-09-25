const express = require('express');
const router = express.Router();
const Categorias_productoService = require('../services/categoria_producto.service');
const validatorHandler = require('../middlewares/validator.handler');
const service = new Categorias_productoService();
const {
  createCategoria_productoDto,
  updateCategoria_productoDto,
  getCategoria_productoId,
} = require('../dtos/categoria_producto.dto');

router.get('/', async (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const categorias_producto = await service.find(limit);
  res.json(categorias_producto);
});

//STATUS CODE

router.get(
  '/:id',
  validatorHandler(getCategoria_productoId, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const categoria_producto = await service.findOne(id);
      res.json({
        success: true,
        message: 'Relación Categoría-Producto encontrada',
        data: categoria_producto,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  validatorHandler(createCategoria_productoDto, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newCategoria_producto = await service.create(body);
      res.json({
        success: true,
        message: 'Producto creado correctamente',
        data: newCategoria_producto,
      });
    } catch (error) {
      next(error);
    }
  }
);

//MENSAJES DE ERROR
router.patch(
  '/:id',
  validatorHandler(getCategoria_productoId, 'params'),
  validatorHandler(updateCategoria_productoDto, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const categoria_producto = await service.update(id, body);
      res.json({
        message: 'update',
        data: categoria_producto,
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
  validatorHandler(getCategoria_productoId, 'params'),
  validatorHandler(updateCategoria_productoDto, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const categoria_producto = await service.updateComplete(id, body);
      res.json({
        message: 'update total',
        data: categoria_producto,
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
  validatorHandler(getCategoria_productoId, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const result = await service.delete(id);
    res.json({
      result,
    });
  }
);

module.exports = router;