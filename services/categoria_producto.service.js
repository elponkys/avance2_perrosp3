const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND, CONFLICT } = require('./../utils');
class categoria_productoService {
  constructor() {
    this.categoria_productos = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
    
        this.categoria_productos.push({
            id: faker.datatype.uuid(),
            id_categoria: faker.datatype.uuid(),
            id_producto: faker.datatype.uuid(),
          });
     
    }
  }

  //FAKER
  async create(data) {
    const newcategoria_productos = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.categoria_productos.push(newcategoria_productos);
    return newcategoria_productos;
  }

  find(limit) {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        var categoria_productos = this.categoria_productos.slice(0, limit);
        if (categoria_productos.length > 0) {
          resolve(categoria_productos);
        } else {
          rejected('');
        }
      }, 5000);
    });
  }



  async findOne(id) {
    //const name = this.getTotal(); PRUEBA DE ERROR DE TRY Y CATCH
    const categoria_producto = this.categoria_productos.find((item) => item.id === id);
    //NOT FOUND
    validateData(categoria_producto, NOTFOUND, 'No encontrado', (data) => !data);

    return categoria_producto;
  }
  async update(id, changes) {
    const index = this.categoria_productos.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentcategoria_producto = this.categoria_productos[index];
    this.categoria_productos[index] = {
      ...currentcategoria_producto,
      ...changes,
    };
    return this.categoria_productos[index];
  }
  async updateComplete(id, changes) {
    const index = this.categoria_productos.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentcategoria_producto = this.categoria_productos[index];
    this.categoria_productos[index] = {
      id: currentcategoria_producto.id,
      ...changes,
    };
    return this.categoria_productos[index];
  }

  async delete(id) {
    const index = this.categoria_productos.findIndex((item) => item.id == id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Producto no encontrado');
    }
    this.categoria_productos.splice(index, 1);
    return {
      message: 'Eliminado',
      id,
    };
  }
}

module.exports = categoria_productoService;