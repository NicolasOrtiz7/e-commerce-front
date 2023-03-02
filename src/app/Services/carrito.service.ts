import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carrito } from '../Classes/carrito';
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



  // ====================================================

  // Copiar estas funciones a la nueva forma y eliminarlas

  carritoSet = new Set<Producto>;

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


  // Simula que el usuario tiene una sesion activa
  // este no lo uso en ningun lado
  usuarioActual:{
    "direccion": "barc",
    "email": "l@gmail.com",
    "id": 2,
    "nombre": "admin",
    "password": "admin",
    "rol":{
      "id": 1,
      "nombre": "admin"
    },
    "telefono": 10,
    "username": "admin"
  }
  getUsuarioActual(){
    return this.http.get("http://localhost:8080/usuarios" + "/listar/" + 2)
  }



  // Recibe todos los carritos de compras de todos los usuarios (usar antes de implementar el login)
  getCarrito(){
    return this.http.get(this.URL + "/listar");
  }

  // Recibe el carrito de compras de un usuario (usar cuando implemente el login)
  getCarritoById(/*id:number*/ ){
    return this.http.get(this.URL + "/listar/" + 2); //despues agregar el parametro id:number
  }


  addCarritoById(carrito:Carrito){
    return this.http.post(this.URL + "/nuevo", carrito);
  }


  deleteCarritoById(id:number){
    return this.http.delete(this.URL + "/eliminar/producto/" + id);
  }



}
