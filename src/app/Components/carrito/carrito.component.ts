import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/Classes/carrito';
import { CarritoService } from 'src/app/Services/carrito.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  totalPrice: any;

  carrito: any = [];

  getTotalPrice: any = this.carritoService.totalPrice(); // Precio total

  constructor(private carritoService: CarritoService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.getCarrito()

    // Obtener el precio total del carrito
    // Pone un SetTimeout para simular el tiempo que tarda en hacer la peticion,
    // esto se tiene que arreglar con promesas
    this.carritoService.totalPrice()
    setTimeout(() => this.totalPrice = this.carritoService.precioTotal, 500);

  }

  restart() {
    setTimeout(() => this.getCarrito(), 500); // Para actualizar el número
    this.ngOnInit()
  }

  getCarrito(/*id:number*/) { // Despues agregar el parametro id:number
    if(localStorage.getItem("currentUser") && localStorage.getItem("token")){
      this.carritoService.getCarrito(/*id*/).subscribe(
        data => this.carrito = data)
    } else{
      this.carrito= this.appComponent.carritoLocalStorage
    }
  }

  addQuantity(carrito: Carrito) {
    // Encuentra el índice del objeto en el carrito basándote en el id del producto
    const index = this.carrito.findIndex((item: { productos: { id: number; }; }) => item.productos.id === carrito.productos.id);
  
    // Verifica si se encontró el objeto en el carrito
    if (index !== -1) {
      // Aumenta la cantidad del objeto recibido por parámetro
      this.carrito[index].cantidad++;
    } else {
      this.carrito.push(carrito);
    }
  
    // Actualiza el localStorage con el carrito modificado
    localStorage.setItem("cart", JSON.stringify(this.carrito));
  }

  removeQuantity(carrito: Carrito) {
    const index = this.carrito.findIndex((item: { productos: { id: number; }; }) => item.productos.id === carrito.productos.id);
  
    if (index !== -1) {
      if (this.carrito[index].cantidad > 1) {
        this.carrito[index].cantidad--;
      } else {
        this.carrito.splice(index, 1); // Elimina el objeto del array
      }
  
      localStorage.setItem("cart", JSON.stringify(this.carrito));
    } else {
      console.error('El objeto no se encuentra en el carrito.');
    }
  }

  cleanProducto(carrito: Carrito){
    const index = this.carrito.findIndex((item: { productos: { id: number; }; }) => item.productos.id === carrito.productos.id);
    this.carrito.splice(index, 1);
    }


}
