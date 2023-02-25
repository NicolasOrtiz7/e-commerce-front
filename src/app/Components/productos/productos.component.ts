import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/Classes/producto';
import { ProductoService } from 'src/app/Services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{
  
  @Input() allProductos:Producto;

  remeras:number = 0;
  pantalones:number = 0;
  camperas:number = 0;
  buzos:number = 0;
  calzado:number = 0;
  gorros:number = 0;

  productos: Producto[];
  productoCategoria: any;
  cantidad: number;

  constructor(
    private router:Router,
    private http: HttpClient,
    private productoService: ProductoService
    ){}

  ngOnInit(): void {
    this.listAllProductos();
    this.listProductoCategoria("remeras");
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
  
  listProductoCategoria(categoria:string){
    this.productoService.listProductoCategoria(categoria).subscribe(
      data => {
        this.productoCategoria = data;
      },
      err => { console.log(err) }
    )
  }


}
