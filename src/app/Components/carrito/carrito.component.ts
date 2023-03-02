import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/Classes/carrito';
import { Producto } from 'src/app/Classes/producto';
import { CarritoService } from 'src/app/Services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{


  carritoDeCompras:any;
  
  getTotalPrice:number = this.carritoService.totalPriceCarrito(); // Precio total

  constructor(private carritoService:CarritoService){}

  ngOnInit(): void {
    this.getCarrito()
  }

  getCarrito(/*id:number*/){ // Despues agregar el parametro id:number
    this.carritoService.getCarrito(/*id*/).subscribe(
      data => this.carritoDeCompras = data)
  }

  addQuantity(carrito:Carrito){
    this.carritoService.addProductImpl(carrito);
    setTimeout(() => this.getCarrito(), 100); // Para actualizar el número

  }

  removeQuantity(carrito:Carrito){
    this.carritoService.subtractProductImpl(carrito);
    setTimeout(() => this.getCarrito(), 100); // Para actualizar el número
  }


}
