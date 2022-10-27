const express = require('express');
const router = express.Router();
const UsuariosService = require('../services/usuarios.service');
const validatorHandler = require('../middlewares/validator.handler');
const service = new UsuariosService();
const {
  createUsuarioDto,
  updateUsuarioDto,
  getUsuarioId,
} = require('../dtos/usuarios.dto');

router.get('/', async (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const usuarios = await service.find(limit);
  res.json(usuarios);
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
    const body = req.body;
    try {
      const newUsuario = await service.create(body);
      res.json({
        success: true,
        message: 'Usuario creado correctamente',
        data: newUsuario,
      });
    } catch (error) {
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
        message: 'update',
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
