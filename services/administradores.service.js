const boom = require('@hapi/boom');
const Model = require('../models/administrador.model');
class adminService {
	constructor() {}
	async create(data) {
		const model = new Model(data);
		await model.save();
		return data;
	}

	async find(filter) {
		let adminsDB = await Model.find(filter);
		
		if (adminsDB == undefined || adminsDB == null)
			throw boom.notFound("errNotFound");
		if (adminsDB.length <= 0)
			throw boom.notFound("errEmpty");
		
		adminsDB = adminsDB.filter((item) => item);
		
		return adminsDB;
	}
	
	async findOne(id) {
		const admin = await Model.findOne({
			_id: id,
		});
		if(admin == undefined || admin == null)
			throw boom.notFound('No se encontró el administrador');
		else if (admin.length <= 0)
			throw boom.notFound('No se encontró ningún registro');
		return admin;
	}
	async update(id, changes) {
		let admin = await Model.findOne({
			_id: id,
		});
		let adminOriginal = {
			isActive: admin.isActive,
			cedula: admin.cedula,
			nombre: admin.nombre,
			fecha: admin.fecha,
			correo: admin.correo,
			contrasenia: admin.contrasenia,
			image: admin.image,
		};
		const { isActive, cedula, nombre, fecha, correo, contrasenia, image } = changes;
		admin.isActive = isActive;
		admin.cedula = cedula;
		admin.nombre = nombre;
		admin.fecha = fecha;
		admin.correo = correo;
		admin.contrasenia = contrasenia;
		admin.image = image;
		admin.save();
		
		return {
			original: adminOriginal,
			actualizado: admin,
		};
	}
	async delete(id) {
		let admin = await Model.findOne({
			_id: id,
		});
		const { deletedCount } = await Model.deleteOne({
			_id: id,
		});
		if (deletedCount <= 0)
			throw boom.notFound('El registro seleccionado no existe');
		return admin;
	}
}

module.exports = adminService;
