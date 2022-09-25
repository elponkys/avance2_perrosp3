const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND, CONFLICT } = require('./../utils');
class reseñaService {
  constructor() {
    this.reseñas = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
    
        this.reseñas.push({
            id: faker.datatype.uuid(),
            id_usuario: faker.datatype.uuid(),
            id_producto: faker.datatype.uuid(),
            fecha: faker.date.past(),
            reseña: faker.commerce.productDescription(),
          });
     
    }
  }

  //FAKER
  async create(data) {
    const newreseña = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.reseñas.push(newreseña);
    return newreseña;
  }

  find(limit) {
    return new Promise((resolve, rejected) => {
      var reseñas = this.reseñas.slice(0, limit);
      if (reseñas.length > 0) {
        resolve(reseñas);
      } else {
        rejected('');
      }
    });
  }



  async findOne(id) {
    //const name = this.getTotal(); PRUEBA DE ERROR DE TRY Y CATCH
    const reseña = this.reseñas.find((item) => item.id === id);
    //NOT FOUND
    validateData(reseña, NOTFOUND, 'No encontrado', (data) => !data);

    return reseña;
  }
  async update(id, changes) {
    const index = this.reseñas.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentreseña = this.reseñas[index];
    this.reseñas[index] = {
      ...currentreseña,
      ...changes,
    };
    return this.reseñas[index];
  }
  async updateComplete(id, changes) {
    const index = this.reseñas.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentreseña = this.reseñas[index];
    this.reseñas[index] = {
      id: currentreseña.id,
      ...changes,
    };
    return this.reseñas[index];
  }

  async delete(id) {
    const resenia = this.reseñas.find((item) => item.id === id);
    if(!resenia) {
      return {
        message: 'Reseña no encontrado para eliminar',
      }
    }
    const index = this.reseñas.findIndex((item) => item.id == id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Reseña no encontrada');
    }
    this.reseñas.splice(index, 1);
    return {
      message: 'Reseña eliminada exitosamente',
      id,
    };
  }
}

module.exports = reseñaService;