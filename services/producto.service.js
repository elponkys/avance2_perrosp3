const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND, CONFLICT } = require('./../utils');
class productoService {
  constructor() {
    this.productos = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
    
        this.productos.push({
            Stock: faker.datatype.int(),
            id: faker.datatype.uuid(),
            id_usuario: faker.datatype.uuid(),
            numero: faker.phone.phoneNumber(),
            nombre: faker.commerce.productName(),
            fecha: faker.date.past(),
            precio: faker.commerce.price(),
            detalles: faker.commerce.productDescription(),
            estado: faker.random.words(),
          });
     
    }
  }

  //FAKER
  async create(data) {
    const newproducto = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.productos.push(newproducto);
    return newproducto;
  }

  find(limit) {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        var productos = this.productos.slice(0, limit);
        if (productos.length > 0) {
          resolve(productos);
        } else {
          rejected('');
        }
      }, 5000);
    });
  }



  async findOne(id) {
    //const name = this.getTotal(); PRUEBA DE ERROR DE TRY Y CATCH
    const producto = this.productos.find((item) => item.id === id);
    //NOT FOUND
    validateData(producto, NOTFOUND, 'No encontrado', (data) => !data);
 
    return producto;
  }
  async update(id, changes) {
    const index = this.productos.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentProducto = this.productos[index];
    this.productos[index] = {
      ...currentProducto,
      ...changes,
    };
    return this.productos[index];
  }
  async updateComplete(id, changes) {
    const index = this.productos.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentProducto = this.productos[index];
    this.productos[index] = {
      id: currentProducto.id,
      ...changes,
    };
    return this.productos[index];
  }

  async delete(id) {
    const index = this.productos.findIndex((item) => item.id == id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Producto no encontrado');
    }
    this.productos.splice(index, 1);
    return {
      message: 'Eliminado',
      id,
    };
  }
}

module.exports = productoService;
