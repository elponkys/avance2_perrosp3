//const faker = require('faker');
const boom = require('@hapi/boom');
const Model = require('../models/usuario.model');
//const { validateData, NOTFOUND, CONFLICT } = require('../utils');
class usuarioService {
	constructor() {}
	async create(data){
		const model = new Model(data);
		await model.save();
		return data;
	}
	
	async findxd() {
		let response = {};
		let usersDB = await Model.find();
		
		//Obtenemos solo la cantidad deseada de registros
		response['users'] = usersDB;
		
		return response;
	}

	async find(filter) {
		
		let users = await Model.find(filter);
		
		if (users == undefined || users == null)
			throw boom.notFound("errNotFound");
		if (users.length <= 0)
			throw boom.notFound("errEmpty");
		
		users = users.filter((item) => item);
		
		return users;
		
	}

	async findOne(id) {
		const usuario = await Model.findOne({
			_id: id,
		});
		if(usuario == undefined || usuario == null)
			throw boom.notFound('No se encontró usuario');
		else if (usuario.length <= 0)
			throw boom.notFound('No se encontró ningún registro');
		return usuario;
	}
	
	async update(id, changes) {
		let user = await Model.findOne({
			_id: id,
		});
		let userOriginal = {
			isActive: user.isActive,
			nombre: user.nombre,
			fecha: user.fecha,
			correo: user.correo,
			contrasenia: user.contrasenia,
			servicio: user.servicio,
			image: user.image,
		};
		const { isActive, nombre, fecha, correo, contrasenia, image, servicio } = changes;
		user.isActive = isActive;
		user.nombre = nombre;
		user.fecha = fecha;
		user.correo = correo;
		user.contrasenia = contrasenia;
		user.servicio = servicio;
		user.image = image;
		user.save();
		
		return {
			original: userOriginal,
			actualizado: user,
		};
	}
	
	async delete(id) {
		let user = await Model.findOne({
			_id: id,
		});
		const { deletedCount } = await Model.deleteOne({
			_id: id,
		});
		if (deletedCount <= 0)
			throw boom.notFound('El registro seleccionado no existe');
		return user;
	}
}

module.exports = usuarioService;
