import { Component, OnInit } from '@angular/core';
import { Producto } from './Classes/producto';
import { CarritoService } from './Services/carrito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Carrito de compras, guarda el id de cada producto
  carrito:Producto[];

  carritoCompras = this.carritoService.carrito;
  
  carritoSinRepetidos = new Set(this.carritoCompras);

  totalPrice:number;

  constructor(private carritoService: CarritoService){}

  ngOnInit(): void {
    this.listProductos()
  }

  listProductos(){
    this.carrito = this.carritoService.carrito;
    console.log("carrito de compras" + this.carrito)
  }

  comprar(){
    console.log("============================================")
    console.log(this.carritoCompras)
    console.log("=============== set ==================")
    console.log(this.carritoSinRepetidos)
    console.log("============================================")

    // Calcular el precio total
    this.totalPrice = this.carritoCompras.reduce((total, producto) => total + producto.precio, 0);

    console.log("PRECIO TOTAL: " + this.totalPrice)

  }


}
