import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/Classes/carrito';
import { CarritoService } from 'src/app/Services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  totalPrice: any;

  carrito: any = [];

  getTotalPrice: any = this.carritoService.totalPrice(); // Precio total

  constructor(private carritoService: CarritoService) { }

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
    this.carritoService.getCarrito(/*id*/).subscribe(
      data => this.carrito = data)
  }

  addQuantity(carrito: Carrito) {
    this.carritoService.addProductSub(carrito);
    this.restart()
  }

  removeQuantity(carrito: Carrito) {
    this.carritoService.subtractProductSub(carrito);
    this.restart()
  }

  cleanProducto(carrito: Carrito) {
    this.carritoService.cleanProductoSub(carrito.id)
    this.restart()
  }



}
