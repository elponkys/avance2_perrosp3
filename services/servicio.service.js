const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND, CONFLICT } = require('./../utils');
class servicioService {
  constructor() {
    this.servicios = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
    
  
        this.servicios.push({
            id: faker.datatype.uuid(),
            id_usuario: faker.datatype.uuid(),
            nombre: faker.commerce.productName(),
            numero: faker.phone.phoneNumber(),
            fecha: faker.date.past(),
            precio: faker.commerce.price(),
            detalles: faker.commerce.productDescription(),
          });
     
    }
  }

  //FAKER
  async create(data) {
    const newservicio = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.servicios.push(newservicio);
    return newservicio;
  }

  find(limit) {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        var servicios = this.servicios.slice(0, limit);
        if (servicios.length > 0) {
          resolve(servicios);
        } else {
          rejected('');
        }
      }, 5000);
    });
  }



  async findOne(id) {
    //const name = this.getTotal(); PRUEBA DE ERROR DE TRY Y CATCH
    const servicio = this.servicios.find((item) => item.id === id);
    //NOT FOUND
    validateData(servicio, NOTFOUND, 'No encontrado', (data) => !data);

    return servicio;
  }
  async update(id, changes) {
    const index = this.servicios.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentservicio = this.servicios[index];
    this.servicios[index] = {
      ...currentservicio,
      ...changes,
    };
    return this.servicios[index];
  }
  async updateComplete(id, changes) {
    const index = this.servicios.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentservicio = this.servicios[index];
    this.servicios[index] = {
      id: currentservicio.id,
      ...changes,
    };
    return this.servicios[index];
  }

  async delete(id) {
    const index = this.servicios.findIndex((item) => item.id == id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Producto no encontrado');
    }
    this.servicios.splice(index, 1);
    return {
      message: 'Eliminado',
      id,
    };
  }
}

module.exports = servicioService;