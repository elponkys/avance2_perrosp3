const express = require('express');
const router = express.Router();
const CategoriasService = require('../services/categorias.service');
const validatorHandler = require('../middlewares/validator.handler');
const service = new CategoriasService();
const {
  createCategoriaDto,
  updateCategoriaDto,
  getCategoriaId,
} = require('../dtos/categorias.dto');

router.get('/', async (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const categorias = await service.find(limit);
  res.json(categorias);
});

//STATUS CODE

router.get(
  '/:id',
  validatorHandler(getCategoriaId, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const categoria = await service.findOne(id);
      res.json({
        success: true,
        message: 'Este es el producto encontrado',
        data: categoria,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  validatorHandler(createCategoriaDto, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newCategoria = await service.create(body);
      res.json({
        success: true,
        message: 'Producto creado correctamente',
        data: newCategoria,
      });
    } catch (error) {
      next(error);
    }
  }
);

//MENSAJES DE ERROR
router.patch(
  '/:id',
  validatorHandler(getCategoriaId, 'params'),
  validatorHandler(updateCategoriaDto, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const categoria = await service.update(id, body);
      res.json({
        message: 'update',
        data: categoria,
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
  validatorHandler(getCategoriaId, 'params'),
  validatorHandler(updateCategoriaDto, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const categoria = await service.updateComplete(id, body);
      res.json({
        message: 'update total',
        data: categoria,
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
  validatorHandler(getCategoriaId, 'params'),
  async (req, res) => {
    const { id } = req.params;
    res.json({
      message: 'delete',
      id,
    });
  }
);

module.exports = router;