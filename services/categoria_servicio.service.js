const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND, CONFLICT } = require('./../utils');
class categoria_servicioService {
  constructor() {
    this.categoria_servicios = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
    
        this.categoria_servicios.push({
            id: faker.datatype.uuid(),
            id_categoria: faker.datatype.uuid(),
            id_servicio: faker.datatype.uuid(),
          });
     
    }
  }

  //FAKER
  async create(data) {
    const newcategoria_servicio = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.categoria_servicios.push(newcategoria_servicio);
    return newcategoria_servicio;
  }

  find(limit) {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        var categoria_servicios = this.categoria_servicios.slice(0, limit);
        if (categoria_servicios.length > 0) {
          resolve(categoria_servicios);
        } else {
          rejected('');
        }
      }, 5000);
    });
  }



  async findOne(id) {
    //const name = this.getTotal(); PRUEBA DE ERROR DE TRY Y CATCH
    const categoria_servicio = this.categoria_servicios.find((item) => item.id === id);
    //NOT FOUND
    validateData(categoria_servicio, NOTFOUND, 'No encontrado', (data) => !data);

    return categoria_servicio;
  }
  async update(id, changes) {
    const index = this.categoria_servicios.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentcategoria_servicio = this.categoria_servicios[index];
    this.categoria_servicios[index] = {
      ...currentcategoria_servicio,
      ...changes,
    };
    return this.categoria_servicios[index];
  }
  async updateComplete(id, changes) {
    const index = this.categoria_servicios.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentcategoria_servicio = this.categoria_servicios[index];
    this.categoria_servicios[index] = {
      id: currentcategoria_servicio.id,
      ...changes,
    };
    return this.categoria_servicios[index];
  }

  async delete(id) {
    const index = this.categoria_servicios.findIndex((item) => item.id == id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Producto no encontrado');
    }
    this.categoria_servicios.splice(index, 1);
    return {
      message: 'Eliminado',
      id,
    };
  }
}

module.exports = categoria_servicioService;