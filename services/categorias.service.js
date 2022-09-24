const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND, CONFLICT } = require('./../utils');
class categoriaService {
  constructor() {
    this.categorias = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
    
        this.categorias.push({
            id: faker.datatype.uuid(),
            nombre: faker.commerce.department(),
          });
     
    }
  }

  //FAKER
  async create(data) {
    const newcategoria = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.categorias.push(newcategoria);
    return newcategoria;
  }

  find(limit) {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        var categorias = this.categorias.slice(0, limit);
        if (categorias.length > 0) {
          resolve(categorias);
        } else {
          rejected('');
        }
      }, 5000);
    });
  }



  async findOne(id) {
    //const name = this.getTotal(); PRUEBA DE ERROR DE TRY Y CATCH
    const categoria = this.categorias.find((item) => item.id === id);
    //NOT FOUND
    validateData(categoria, NOTFOUND, 'No encontrado', (data) => !data);

    return categoria;
  }
  async update(id, changes) {
    const index = this.categorias.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentcategoria = this.categorias[index];
    this.categorias[index] = {
      ...currentcategoria,
      ...changes,
    };
    return this.categorias[index];
  }
  async updateComplete(id, changes) {
    const index = this.categorias.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentcategoria = this.categorias[index];
    this.categorias[index] = {
      id: currentcategoria.id,
      ...changes,
    };
    return this.categorias[index];
  }

  async delete(id) {
    const index = this.categorias.findIndex((item) => item.id == id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Producto no encontrado');
    }
    this.categorias.splice(index, 1);
    return {
      message: 'Eliminado',
      id,
    };
  }
}

module.exports = categoriaService;
