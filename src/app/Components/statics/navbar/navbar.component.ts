import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carrito } from 'src/app/Classes/carrito';
import { CarritoService } from 'src/app/Services/carrito.service';
import { CategoriaService } from 'src/app/Services/categoria.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  categorias:any;
  carritoDeCompras: any = []
  precioTotal:any;

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private categoriaService:CategoriaService,
    private carritoService:CarritoService
  ){}

  ngOnInit(): void {
      this.getCategorias()
      this.getCarrito(2)
      this.carritoService.totalPrice()
      setTimeout(() => this.precioTotal = this.carritoService.precioTotal, 500);
  }

  getCategorias(){
    this.categoriaService.getCategorias().subscribe(
      data => this.categorias = data,
      err => console.log(err)
    )
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

  
  addQuantity(carrito:Carrito){
    this.carritoService.addProductImpl(carrito);
    this.restart()
  }

  removeQuantity(carrito:Carrito){
    this.carritoService.subtractProductImpl(carrito);
    this.restart()
  }

  cleanCarrito(carrito:Carrito){
    this.carritoService.cleanProductoImpl(carrito.id)
    this.restart()
  }

  restart(){
    setTimeout(() => this.getCarrito(2), 100); // Para actualizar el número
    this.ngOnInit()
  }

}
