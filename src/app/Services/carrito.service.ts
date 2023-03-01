import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../Classes/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  URL = "http://localhost:8080/carrito";

  // Este servicio es para agregar productos al carrito de compras

  // Debe estar inicializado vacío
  carrito:Producto[] = [];   // esta ya no lo uso mas, ahora uso el carritoSet

  constructor(private http:HttpClient) { }

  addProducto(producto:Producto){ // esta ya no lo uso mas, ahora uso el addProductoSet
      this.carrito.push(producto);
  }

  deleteProducto(producto:Producto){ // esta ya no lo uso mas, ahora uso el removeProductoSet
    
    // Busca el índice del producto
    const index = this.carrito.findIndex(p => p.id_producto === producto.id_producto);

    // Eliminamos el producto del array
    if (index !== -1) {
      this.carrito.splice(index, 1);
    }
  }


  // ====================================================

  // Este es el que funciona bien. Eliminar el de la linea 18

  carritoSet = new Set<Producto>;
  
  addProductoSet(producto:Producto){
    producto.cantidadCarrito = 1; // Inicializa la cantidad de productos que se agregan al carrito
    this.carritoSet.add(producto);
  }

  deleteProductoSet(producto:Producto){
    producto.cantidadCarrito = 0; // Elimina la cantidad de productos del carrito
    this.carritoSet.delete(producto)
  }

  addQuantity(producto:Producto){ // Agrega cantidad de un producto al carrito
    producto.cantidadCarrito++
  }

  removeQuantity(producto:Producto){ // Resta cantidad de un producto al carrito
    if(producto.cantidadCarrito > 0) producto.cantidadCarrito--;   
    else console.log("Error, la cantidad no puede ser negativa")
  }

  totalPrice():number { // Calcula el precio total del carrito
    let totalPrice = 0;
    this.carritoSet.forEach(p =>{
      totalPrice += p.precio
    })
    console.log("EL precio total del carrito es: " + totalPrice)
    return totalPrice;
  }

  // ====================================================
  // usar este

  // Recibe todos los carritos de compras de todos los usuarios (usar antes de implementar el login)
  getCarrito(){
    return this.http.get(this.URL + "/listar");
  }

  // Recibe el carrito de compras de un usuario (usar cuando implemente el login)
  getCarritoById(id:number){
    return this.http.get(this.URL + "/listar/" + id);
  }

  addCarritoById(producto:Producto){
    // return this.http.post()
  }

  deleteCarritoById(id:number){
    return this.http.delete(this.URL + "/eliminar/producto/" + id);
  }



}
