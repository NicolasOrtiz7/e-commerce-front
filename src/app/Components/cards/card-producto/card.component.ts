import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Producto } from 'src/app/Classes/producto';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ProductoService } from 'src/app/Services/producto.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{

  producto: Producto;      // Para listar y agregar al carrito
  nuevoCarrito:any = {};   // Para meter productos y guardar el carrito en BBDD
  usuarioActual:any;       // Obtener el carrito del usuario logeado

  @Input() allProductos:Producto; // Traer los productos desde el home-component

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
    this.productoService.getProductoId(id).subscribe(
      data => this.producto = data ,
      err => console.log(err) 
    )
  }


  getUsuarioActual(){
    this.carritoService.getUsuarioActual().subscribe(
      data => this.usuarioActual = data )
    }


  addCarrito(producto:Producto){

    console.log("El usuario actual es: ")
    console.log(this.usuarioActual)

    this.nuevoCarrito.id = undefined; // Para que se envíe vací y el back end le asigne un id
    this.nuevoCarrito.productos = producto;
    this.nuevoCarrito.usuario = this.usuarioActual;
    
    console.log(this.nuevoCarrito)

    this.carritoService.addProductSub(this.nuevoCarrito)

    setTimeout(() => this.appComponent.getCarrito(this.usuarioActual), 200); // Refrescar el carrito
    // Uso setTimeout porque a veces no carga al instante, esto se puede mejorar.
  }
  

  // Enviar id del producto clickeado al detalles-producto.component para cargar los detalles del producto
  @Output() idProducto = new EventEmitter<number>();
  sendDetails(id:number) {
    this.idProducto.emit(id);
  }




}
