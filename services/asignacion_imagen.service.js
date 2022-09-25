const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND, CONFLICT } = require('./../utils');
class asignacion_imagenService {
  constructor() {
    this.asignacion_imagenes = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
    
    
        this.asignacion_imagenes.push({
            id: faker.datatype.uuid(),
            id_producto: faker.datatype.uuid(),
            id_imagen: faker.datatype.uuid(),
          });
     
    }
  }

  //FAKER
  async create(data) {
    const newasignacion_imagen = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.asignacion_imagenes.push(newasignacion_imagen);
    return newasignacion_imagen;
  }

  find(limit) {
    return new Promise((resolve, rejected) => {
      var asignacion_imagenes = this.asignacion_imagenes.slice(0, limit);
      if (asignacion_imagenes.length > 0) {
        resolve(asignacion_imagenes);
      } else {
        rejected('');
      }
    });
  }



  async findOne(id) {
    //const name = this.getTotal(); PRUEBA DE ERROR DE TRY Y CATCH
    const asignacion_imagen = this.asignacion_imagenes.find((item) => item.id === id);
    //NOT FOUND
    validateData(asignacion_imagen, NOTFOUND, 'No encontrado', (data) => !data);
    return asignacion_imagen;
  }
  async update(id, changes) {
    const index = this.asignacion_imagenes.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentasignacion_imagen = this.asignacion_imagenes[index];
    this.asignacion_imagenes[index] = {
      ...currentasignacion_imagen,
      ...changes,
    };
    return this.asignacion_imagenes[index];
  }
  async updateComplete(id, changes) {
    const index = this.asignacion_imagenes.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentasignacion_imagen = this.asignacion_imagenes[index];
    this.asignacion_imagenes[index] = {
      id: currentasignacion_imagen.id,
      ...changes,
    };
    return this.asignacion_imagenes[index];
  }

  async delete(id) {
    const asignacion_imagen = this.asignacion_imagenes.find((item) => item.id === id);
    if(!asignacion_imagen) {
      return {
        message: 'Asignación de imagen no encontrada para eliminar',
      }
    }
    const index = this.asignacion_imagenes.findIndex((item) => item.id == id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Asignación de imagen no encontrada');
    }
    this.asignacion_imagenes.splice(index, 1);
    return {
      message: 'Asignación de imagen eliminada exitosamente',
      id,
    };
  }
}

module.exports = asignacion_imagenService;