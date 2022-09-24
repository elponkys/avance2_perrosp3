const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND, CONFLICT } = require('./../utils');
class adminService {
  constructor() {
    this.administradores = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
    
      this.administradores.push({
        isActive: faker.datatype.boolean(),
        id: faker.datatype.uuid(),
        nombre: faker.name.firstName(),
        fecha: faker.date.past(),
        image: faker.image.imageUrl(),
        correo: faker.internet.email(),
        cedula: faker.datatype.uuid(),
        contraseña: faker.internet.password(),
      });
     
    }
  }

  //FAKER
  async create(data) {
    const newadmin = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.administradores.push(newadmin);
    return newadmin;
  }

  find(limit) {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        var administradores = this.administradores.slice(0, limit);
        if (administradores.length > 0) {
          resolve(administradores);
        } else {
          rejected('');
        }
      }, 5000);
    });
  }

  findActiveadmins() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const activeadmins = this.administradores.filter((x) => x.isActive === true);
        resolve(activeadmins);
      }, 2000);
    });
  }

  async findOne(id) {
    //const name = this.getTotal(); PRUEBA DE ERROR DE TRY Y CATCH
    const administrador = this.administradores.find((item) => item.id === id);
    //NOT FOUND
    validateData(administrador, NOTFOUND, 'No encontrado', (data) => !data);
    validateData(
        administrador,
      CONFLICT,
      'CONFLICTO, el producto esta bloqueado.',
      (data) => data.isActive == false
    );
    return administrador;
  }
  async update(id, changes) {
    const index = this.administradores.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentadmin = this.administradores[index];
    this.administradores[index] = {
      ...currentadmin,
      ...changes,
    };
    return this.administradores[index];
  }
  async updateComplete(id, changes) {
    const index = this.administradores.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentadmin = this.administradores[index];
    this.administradores[index] = {
      id: currentadmin.id,
      ...changes,
    };
    return this.administradores[index];
  }

  async delete(id) {
    const index = this.administradores.findIndex((item) => item.id == id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Producto no encontrado');
    }
    this.administradores.splice(index, 1);
    return {
      message: 'Eliminado',
      id,
    };
  }
}

module.exports = adminService;
