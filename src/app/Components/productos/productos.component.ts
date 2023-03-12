import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/Classes/producto';
import { CarritoService } from 'src/app/Services/carrito.service';
import { CategoriaService } from 'src/app/Services/categoria.service';
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
  categorias: any;
  productoCategoria: any;
  cantidad: number;
  filtradosPorNombre:any = [];

  // Categoría para el filtrado/ordenamiento
  categoria: string;

  // Saber si existen query params
  queryParams: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    private categoriaService: CategoriaService
  ) { }


  ngOnInit(): void {
    // Carga todos los productos al inicio
    this.listAllProductos();
    this.countProductos();
    this.getCategorias()

    // Carga los productos con parámetros al entrar con link o botones
    this.activatedRoute.queryParams.subscribe(params => {
      // Guarda los query params de la url
      this.queryParams = this.activatedRoute.snapshot.queryParams;
      // Llama al método que carga los productos y los filtra
      this.productoService.listProductoCategoria(this.queryParams['categoria'], this.queryParams['orden']) // aca no sé por qué envío 2 veces el 'categoria' pero igual funciona
        .subscribe(
          data => {
            this.productoCategoria = data;
            // Para filtrar por nombre, precio
            this.categoria = this.queryParams['categoria'];
          }, err => console.log(err))
    }
    );
  }

  // Cargar el número de prendas que hay en cada categoría
  listAllProductos() {
    this.productoService.listAllProductos().subscribe(
      data => this.productos = data,
      err => console.log(err)
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

  // Cantidad de productos que hay en cada categoria
  countProductos() { // Hay que hacerlo dinamico
    this.productoService.listAllProductos().subscribe(
      data => {
        // this.productos = data;

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

  getCategorias(){
    this.categoriaService.getCategorias().subscribe(
      data => this.categorias = data
    )
  }


}
