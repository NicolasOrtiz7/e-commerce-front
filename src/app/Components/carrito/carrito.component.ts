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
  
  getTotalPrice:number = this.carritoService.totalPrice(); // Precio total

  constructor(private carritoService:CarritoService){}

  ngOnInit(): void {
  }

  deleteProductoSet(producto:Producto){
    this.carritoService.deleteProductoSet(producto);
  }

  addQuantity(producto:Producto){
    this.carritoService.addQuantity(producto);
  }

  removeQuantity(producto:Producto){
    this.carritoService.removeQuantity(producto);
  }

}
