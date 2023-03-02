import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/Classes/producto';
import { CarritoService } from 'src/app/Services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{

  carritoProductoSet = this.carritoService.carritoSet; // Carrito de compras

  carritoDeCompras:any;
  
  getTotalPrice:number = this.carritoService.totalPrice(); // Precio total

  constructor(private carritoService:CarritoService){}

  ngOnInit(): void {
    this.getCarrito()
  }

  getCarrito(/*id:number*/){ // Despues agregar el parametro id:number
    this.carritoService.getCarritoById(/*id*/).subscribe(
      data => {
        this.carritoDeCompras = data
      }
    )
  }

  addQuantity(producto:Producto){
    this.carritoService.addQuantity(producto);
  }

  removeQuantity(producto:Producto){
    this.carritoService.removeQuantity(producto);
  }

}
