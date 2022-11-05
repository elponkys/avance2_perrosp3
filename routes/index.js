const express = require('express');
const usersRouter = require('./usuarios.router');
const servicesRouter = require('./servicios.router');
const reviewsRouter = require('./resenias.router');
const productsRouter = require('./productos.router');
const imagesRouter = require('./imagenes.router');
const categoriesRouter = require('./categorias.router');
const categoriesServicesRouter = require('./categorias_servicios.router');
const categoriesProductsRouter = require('./categorias_productos.router');
const imageAssignationsRouter = require('./asignaciones_imagen.router');
const adminsRouter = require('./administradores.router');

function routerApi(app) {
	const router = express.Router();
	app.use('/api/v1', router);
	router.use('/usuarios', usersRouter);
	router.use('/servicios', servicesRouter);
	router.use('/resenias', reviewsRouter);
	router.use('/productos', productsRouter);
	router.use('/imagenes', imagesRouter);
	router.use('/categorias', categoriesRouter);
	router.use('/categorias_servicios', categoriesServicesRouter);
	router.use('/categorias_productos', categoriesProductsRouter);
	router.use('/asignaciones_imagenes', imageAssignationsRouter);
	router.use('/administradores', adminsRouter);
}

module.exports = routerApi;