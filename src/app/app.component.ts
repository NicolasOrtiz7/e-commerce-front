import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from './Classes/producto';
import { CarritoService } from './Services/carrito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  carritoDeCompras: any = []

  constructor(
    private carritoService: CarritoService, private router: Router) { }

  ngOnInit(): void {
    this.getCarrito(2)
  }

  comprar() { this.router.navigate(["/carrito"]) }


  getCarrito(id: number) {
    this.carritoService.getCarrito(/*id*/).subscribe(
      data => this.carritoDeCompras = data )
  }

  deleteCarrito(id: number) {
    this.carritoService.cleanCarrito(id).subscribe(
      data => {
        console.log("Producto eliminado. ID: " + id)
        this.getCarrito(2)
      },
      err => { console.log(err) }
    )
  }




}
