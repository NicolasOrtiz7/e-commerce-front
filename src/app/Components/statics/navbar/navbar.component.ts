import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carrito } from 'src/app/Classes/carrito';
import { LoginService } from 'src/app/Security/login.service';
import { CarritoService } from 'src/app/Services/carrito.service';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { ProductoService } from 'src/app/Services/producto.service';

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
    private carritoService:CarritoService,
    private productoService:ProductoService,
    private loginService:LoginService
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
    this.carritoService.addProductSub(carrito);
    this.restart()
  }

  removeQuantity(carrito:Carrito){
    this.carritoService.subtractProductSub(carrito);
    this.restart()
  }

  cleanCarrito(carrito:Carrito){
    this.carritoService.cleanProductoSub(carrito.id)
    this.restart()
  }

  restart(){
    setTimeout(() => this.getCarrito(2), 100); // Para actualizar el número
    this.ngOnInit()
  }

  keyword:string;
  jaja:any = []
  getProductosNombre(keyword:string){
    this.productoService.getProductoNombre(keyword).subscribe(
      data =>  {
        this.jaja = data
        console.log(this.jaja)
      } )
  }

  logout(){
    this.loginService.logout();
  }

}
