import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    console.log("EL usuario logeado en el card component es " + this.getUsuarioActual())
  }

  listProductoId(id:number){
    this.productoService.listProductoId(id).subscribe(
      data => this.producto = data ,
      err => console.log(err) 
    )
  }

  usuarioActual:any;
  getUsuarioActual(){
    this.carritoService.getUsuarioActual().subscribe(
      data => this.usuarioActual = data )
    }

  nuevoCarrito:any = {}; 

  addCarrito(producto:Producto){

    console.log("El actual usuaio res")
    console.log(this.usuarioActual)

    this.nuevoCarrito.id = undefined; // Para que se envie vacio y el backend le asigne autoincrement
    this.nuevoCarrito.productos = producto;
    this.nuevoCarrito.usuario = this.usuarioActual;
    
    console.log(this.nuevoCarrito)

    this.carritoService.addProductImpl(this.nuevoCarrito)

    setTimeout(() => this.appComponent.getCarrito(this.usuarioActual), 200); // Refrescar el carrito

  }

  // Enviar id del producto clickeado para cargar los detalles
  @Output() idProducto = new EventEmitter<number>();
  sendDetails(id:number) {
    this.idProducto.emit(id);
  }




}
