import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/Classes/producto';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ProductoService } from 'src/app/Services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  // Traer los datos de los productos desde el home-component
  @Input() allProductos: Producto;

  // Cantidad de stock por categoría
  remeras: number = 0;
  pantalones: number = 0;
  camperas: number = 0;
  buzos: number = 0;
  calzado: number = 0;
  gorros: number = 0;

  // Listas de productos
  productos: Producto[];
  productoCategoria: any;
  cantidad: number;

  // Categoría para el filtrado/ordenamiento
  categoria: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
  ) { }


  ngOnInit(): void {

    // Carga los productos con parámetros al entrar con link o botones
    this.activatedRoute.queryParams.subscribe(params => {
      // Guarda los query params de la url
      const queryParams = this.activatedRoute.snapshot.queryParams;
      // Llama al método que carga los productos y los filtra
      this.productoService.listProductoCategoria(queryParams['categoria'], queryParams['categoria'])
        .subscribe(
          data => {
            this.productoCategoria = data;
            // Para filtrar por nombre, precio
            this.categoria = queryParams['categoria'];
          }, err => console.log(err))
    }
    );
    // Carga todos los productos al inicio
    this.listAllProductos();
  }

  // Cargar el número de prendas que hay en cada categoría
  listAllProductos() {
    this.productoService.listAllProductos().subscribe(
      data => {
        this.productos = data;

        this.productos.forEach((item: any) => {

          let a = item.categoria.nombre
          if (a == "remeras") this.remeras++
          if (a == "pantalones") this.pantalones++
          if (a == "camperas") this.camperas++
          if (a == "calzado") this.calzado++
          if (a == "buzos") this.buzos++
          if (a == "gorros") this.gorros++

        });
      },
      err => { console.log(err) }
    )
  }

  // Carga los productos al presionar los botones del sidebar y del "ordenar por"
  listProductoCategoria(categoria: string, orden: string = "ASC") {
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
