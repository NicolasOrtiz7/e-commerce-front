import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/Classes/producto';
import { CarritoService } from 'src/app/Services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{

  carrito = this.carritoService.carrito;

  constructor(private carritoService:CarritoService){}

  ngOnInit(): void {
  }

  


}
