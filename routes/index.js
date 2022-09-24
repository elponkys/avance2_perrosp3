const express = require('express');
const productsRouter = require('./usuarios.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/usuarios', productsRouter);
  router.use('/servicio', productsRouter);
  router.use('/reseñas', productsRouter);
  router.use('/producto', productsRouter);
  router.use('/imagen', productsRouter);
  router.use('/categorias', productsRouter);
  router.use('/categoria_servicio', productsRouter);
  router.use('/categoria_producto', productsRouter);
  router.use('/asignacion_imagen', productsRouter);
  router.use('/administradores', productsRouter);
  //router.use('/users', productsRouter);
  //router.use('/categories', productsRouter);
}

module.exports = routerApi;
