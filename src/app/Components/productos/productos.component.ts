import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/Classes/producto';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ProductoService } from 'src/app/Services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{
  
  // Traer los datos de los productos desde el home-component
  @Input() allProductos:Producto;

  // Cantidad de stock por categoría
  remeras:number = 0;
  pantalones:number = 0;
  camperas:number = 0;
  buzos:number = 0;
  calzado:number = 0;
  gorros:number = 0;

  // Listas de productos
  productos: Producto[];
  productoCategoria: any;
  cantidad: number;
  cantidadCarrito:number = this.carritoService.carrito.length; // Lo uso en el numerito del sidebar (carrito de compras) para mostrar la cantidad de productos que hay en el carrito. Pero ya no sirve, cambiar por this.carritoService.carritoSet.size;

  // Categoría para el filtrado/ordenamiento
  categoria: string;

  constructor(
    private router:Router,
    private http: HttpClient,
    private productoService: ProductoService,
    private carritoService: CarritoService
    ){}

  ngOnInit(): void {
    this.listAllProductos();
  }

  // Para cargar el número de prendas que hay en cada categoría
  listAllProductos(){
    this.productoService.listAllProductos().subscribe(
      data => {
        this.productos = data;

        this.productos.forEach((item:any) => {

          let a = item.categoria.nombre
          if (a == "remeras") this.remeras++
          if (a == "pantalones") this.pantalones++
          if (a == "camperas") this.camperas++
          if (a == "calzado") this.calzado++
          if (a == "buzos") this.buzos++
          if (a == "gorros") this.gorros++

        });
      },
      err => {console.log(err)}
    )
  }
  
  listProductoCategoria(categoria:string, orden:string="ASC"){
    this.productoService.listProductoCategoria(categoria, orden).subscribe(
      data => {
        this.productoCategoria = data;

        // Para filtrar por nombre, precio
        this.categoria = categoria;
      },
      err => { console.log(err) }
    )
  }


}
