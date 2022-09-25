const express = require('express');
const router = express.Router();
const ProductosService = require('../services/producto.service');
const validatorHandler = require('../middlewares/validator.handler');
const service = new ProductosService();
const {
  createProductoDto,
  updateProductoDto,
  getProductoId,
} = require('../dtos/producto.dto');

router.get('/', async (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const productos = await service.find(limit);
  res.json(productos);
});

//STATUS CODE

router.get(
  '/:id',
  validatorHandler(getProductoId, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const producto = await service.findOne(id);
      res.json({
        success: true,
        message: 'Este es el producto encontrado',
        data: producto,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  validatorHandler(createProductoDto, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newProducto = await service.create(body);
      res.json({
        success: true,
        message: 'Producto creado correctamente',
        data: newProducto,
      });
    } catch (error) {
      next(error);
    }
  }
);

//MENSAJES DE ERROR
router.patch(
  '/:id',
  validatorHandler(getProductoId, 'params'),
  validatorHandler(updateProductoDto, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const producto = await service.update(id, body);
      res.json({
        message: 'update',
        data: producto,
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
  validatorHandler(getProductoId, 'params'),
  validatorHandler(updateProductoDto, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const producto = await service.updateComplete(id, body);
      res.json({
        message: 'update total',
        data: producto,
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
  validatorHandler(getProductoId, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const result = await service.delete(id);
    res.json({
      result,
    });
  }
);

module.exports = router;