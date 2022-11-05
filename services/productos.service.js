
const boom = require('@hapi/boom');
const Model = require('../models/producto.model');
class productoService {
	constructor() {}
	async create(data) {
		const model = new Model(data);
		await model.save();
		return data;
	}
	
	async find(limit) {
		let response = {};
		let productsDB = await Model.find();
		
		response['services'] = productsDB
			? productsDB.filter((item, index) => item && index < limit)
			: productsDB;
		
		return response;
	}
	
	async findOne(id) {
		const producto = await Model.findOne({
			_id: id,
		});
		if(producto == undefined || producto == null)
			throw boom.notFound('No se encontró el producto');
		else if (producto.length <= 0)
		throw boom.notFound('No se encontró ningún registro');
		return producto;
	}
	async update(id, changes) {
		let product = await Model.findOne({
			_id: id,
		});
		let productOriginal = {
			stock: product.stock,
			id_usuario: product.id_usuario,
			numero: product.numero,
			nombre: product.nombre,
			fecha: product.fecha,
			precio: product.precio,
			detalles: product.detalles,
			estado: product.edtado,
		};
		const { stock, id_usuario, numero, nombre, fecha, precio, detalles, estado } = changes;
		product.stock = stock;
		product.id_usuario = id_usuario;
		product.numero = numero;
		product.nombre = nombre;
		product.fecha = fecha;
		product.precio = precio;
		product.detalles = detalles;
		product.estado = estado;
		product.save();
		
		return {
			original: productOriginal,
			actualizado: product,
		};
	}
	async delete(id) {
		let product = await Model.findOne({
			_id: id,
		});
		const { deletedCount } = await Model.deleteOne({
			_id: id,
		});
		if (deletedCount <= 0)
			throw boom.notFound('El registro seleccionado no existe');
		return product;
	}
}

module.exports = productoService;
