import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Carrito } from 'src/app/Classes/carrito';
import { Producto } from 'src/app/Classes/producto';
import { Usuario } from 'src/app/Classes/usuario';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ProductoService } from 'src/app/Services/producto.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{

  producto: Producto;

  @Input() allProductos:Producto;

  constructor(
    private productoService:ProductoService,
    private carritoService: CarritoService,
    private appComponent: AppComponent
  ){}

  ngOnInit(){
    this.getUsuarioActual()
  }

  listProductoId(id:number){
    this.productoService.listProductoId(id).subscribe(
      data => { this.producto = data },
      err => { console.log(err) }
    )
  }


  // =============================
  // NUEVO


  usuarioActual:Usuario;
  getUsuarioActual(){
    this.carritoService.getUsuarioActual().subscribe(
      data => {
        this.usuarioActual = data
      } 
    )
  }

  nuevoCarrito:any = {}; // Habia que inicializar!!!!!!!
  // addCarrito(producto:Producto){

  //   this.nuevoCarrito.productos = producto;
  //   this.nuevoCarrito.id = undefined; // Para que se envie vacio y el backend le asigne autoincrement
  //   this.nuevoCarrito.usuario = this.usuarioActual;
    
  //   console.log(this.nuevoCarrito)

  //   this.carritoService.addProduct(this.nuevoCarrito).subscribe(
  //     data =>{
  //       console.log("Agregado a carrito correctamente")
  //       console.log(this.nuevoCarrito)
  //       this.appComponent.getCarrito(2) // Para refrescar los datos
  //     },
  //     err => {console.log(err)}
  //   )

  // }

  addCarrito(producto:Producto){

    this.nuevoCarrito.productos = producto;
    this.nuevoCarrito.id = undefined; // Para que se envie vacio y el backend le asigne autoincrement
    this.nuevoCarrito.usuario = this.usuarioActual;
    
    console.log(this.nuevoCarrito)

    this.carritoService.addProductImpl(this.nuevoCarrito)

  }

}
