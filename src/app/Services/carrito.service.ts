import { Injectable } from '@angular/core';
import { Producto } from '../Classes/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  // Este servicio es para agregar productos al carrito de compras

  // Debe estar inicializado vacío
  carrito:Producto[] = [];

  productosEnCarrito: Map<Producto, number> = new Map();

  constructor() { }

  addProducto(producto:Producto){
      this.carrito.push(producto);
  }

  deleteProducto(producto:Producto){
    
    // Busca el índice del producto
    const index = this.carrito.findIndex(p => p.id_producto === producto.id_producto);

    // Eliminamos el producto del array
    if (index !== -1) {
      this.carrito.splice(index, 1);
    }
  }

}
