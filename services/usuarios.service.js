const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND, CONFLICT } = require('../utils');
class usuarioService {
  constructor() {
    this.usuarios = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.usuarios.push({
        isActive: faker.datatype.boolean(),
        id: faker.datatype.uuid(),
        nombre: faker.name.firstName(),
        fecha: faker.date.past(),
        image: faker.image.imageUrl(),
        correo: faker.internet.email(),
        contraseña: faker.internet.password(),
      });     
    }
  }

  //FAKER
  async create(data) {
    const newUsuario = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.usuarios.push(newUsuario);
    return newUsuario;
  }

  find(limit) {
    return new Promise((resolve, rejected) => {
      var usuarios = this.usuarios.slice(0, limit);
      if (usuarios.length > 0) {
        resolve(usuarios);
      } else {
        rejected('');
      }
    });
  }

  findActiveusuarios() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const activeusuarios = this.usuarios.filter((x) => x.isActive === true);
        resolve(activeusuarios);
      }, 2000);
    });
  }

  async findOne(id) {
    //const name = this.getTotal(); PRUEBA DE ERROR DE TRY Y CATCH
    const usuario = this.usuarios.find((item) => item.id === id);
    //NOT FOUND
    validateData(usuario, NOTFOUND, 'No encontrado', (data) => !data);
    validateData(
      usuario,
      CONFLICT,
      'El usuario está inactivo.',
      (data) => data.isActive == false
    );
    return usuario;
  }
  async update(id, changes) {
    const index = this.usuarios.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentusuario = this.usuarios[index];
    this.usuarios[index] = {
      ...currentusuario,
      ...changes,
    };
    return this.usuarios[index];
  }
  async updateComplete(id, changes) {
    const index = this.usuarios.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentusuario = this.usuarios[index];
    this.usuarios[index] = {
      id: currentusuario.id,
      ...changes,
    };
    return this.usuarios[index];
  }

  async delete(id) {
    const usuario = this.usuarios.find((item) => item.id === id);
    if(!usuario) {
      return {
        message: 'Usuario no encontrado para eliminar',
      }
    }
    const index = this.usuarios.findIndex((item) => item.id == id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Usuario no encontrado');
    }
    this.usuarios.splice(index, 1);
    return {
      message: 'Usuario eliminado exitosamente',
      id,
    };
  }
}

module.exports = usuarioService;
