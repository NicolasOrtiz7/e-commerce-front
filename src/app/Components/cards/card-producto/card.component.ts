import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/Classes/producto';
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
    private router:Router,
    private productoService:ProductoService,
    private carritoService: CarritoService
  ){}

  ngOnInit(){
  }

  listProductoId(id:number){
    this.productoService.listProductoId(id).subscribe(
      data => { this.producto = data },
      err => { console.log(err) }
    )
  }

  addProducto(producto:Producto){
    this.productoService.listProductoId(producto.id_producto).subscribe(
      data => {
        this.carritoService.addProductoSet(producto);
        },
      err => { console.log(err) }
    )
  }

  deleteProducto(producto:Producto){
    this.carritoService.deleteProductoSet(producto);
  }

}
