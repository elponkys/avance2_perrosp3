const express = require('express');
const usersRouter = require('./usuarios.router');
const servicesRouter = require('./servicio.router');
const reviewsRouter = require('./reseñas.router');
const productsRouter = require('./producto.router');
const imagesRouter = require('./imagen.router');
const categoriesRouter = require('./categorias.router');
const categoriesServicesRouter = require('./categoria_servicio.router');
const categoriesProductsRouter = require('./categoria_producto.router');
const imageAssignationRouter = require('./asignacion_imagen.router');
const adminRouter = require('./administradores.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/usuarios', usersRouter);
  router.use('/servicio', servicesRouter);
  router.use('/resenias', reviewsRouter);
  router.use('/producto', productsRouter);
  router.use('/imagen', imagesRouter);
  router.use('/categorias', categoriesRouter);
  router.use('/categoria_servicio', categoriesServicesRouter);
  router.use('/categoria_producto', categoriesProductsRouter);
  router.use('/asignacion_imagen', imageAssignationRouter);
  router.use('/administradores', adminRouter);
}

module.exports = routerApi;
