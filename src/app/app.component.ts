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

  // Carrito de compras, guarda el id de cada producto
  carritoProductoSet = this.carritoService.carritoSet;

  carritoCompras = this.carritoService.carrito; // este ya no lo uso, eliminar.

  totalPrice:number;

  constructor(
    private carritoService: CarritoService,
    private router:Router
    ){}

  ngOnInit(): void {
    this.listProductos()
    this.getCarrito(2)
  }

  listProductos(){ // este creo que ya no hace nada, (verificar)
    this.carritoProductoSet = this.carritoService.carritoSet;
  }

  comprar(){
    this.router.navigate(["/carrito"])

    // Calcular el precio total. ESTO ya no funciona, eliminar
    this.totalPrice = this.carritoCompras.reduce((total, producto) => total + producto.precio, 0);
    console.log("PRECIO TOTAL: " + this.totalPrice)

  }


// =============================================
// ultimo

arrayCarrito:any = []
getCarrito(id:number){
  this.carritoService.getCarritoById(/*id*/).subscribe(
    data => {
      this.arrayCarrito = data
    }
  )
}

deleteCarrito(id:number){
  this.carritoService.deleteCarritoById(id).subscribe(
    data => {
      console.log("Producto eliminado. ID: " + id)
    this.getCarrito(2)
    },
    err => { console.log(err) }
  )
}

// test(){
//   this.getCarrito()
// }



}
