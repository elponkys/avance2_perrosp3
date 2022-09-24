const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND, CONFLICT } = require('./../utils');
class imagenService {
  constructor() {
    this.imagenes = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
    
        this.imagenes.push({
            id: faker.datatype.uuid(),
            imagen: faker.image.animals(),
          });
     
    }
  }

  //FAKER
  async create(data) {
    const newimagen = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.imagenes.push(newimagen);
    return newimagen;
  }

  find(limit) {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        var imagenes = this.imagenes.slice(0, limit);
        if (imagenes.length > 0) {
          resolve(imagenes);
        } else {
          rejected('');
        }
      }, 5000);
    });
  }



  async findOne(id) {
    //const name = this.getTotal(); PRUEBA DE ERROR DE TRY Y CATCH
    const imagen = this.imagenes.find((item) => item.id === id);
    //NOT FOUND
    validateData(imagen, NOTFOUND, 'No encontrado', (data) => !data);

    return imagen;
  }
  async update(id, changes) {
    const index = this.imagenes.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentimagen = this.imagenes[index];
    this.imagenes[index] = {
      ...currentimagen,
      ...changes,
    };
    return this.imagenes[index];
  }
  async updateComplete(id, changes) {
    const index = this.imagenes.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentimagen = this.imagenes[index];
    this.imagenes[index] = {
      id: currentimagen.id,
      ...changes,
    };
    return this.imagenes[index];
  }

  async delete(id) {
    const index = this.imagenes.findIndex((item) => item.id == id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Producto no encontrado');
    }
    this.imagenes.splice(index, 1);
    return {
      message: 'Eliminado',
      id,
    };
  }
}

module.exports = imagenService;