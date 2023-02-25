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

  productoCategoria: any;

  constructor(
    private router:Router,
    private http: HttpClient,
    private productoService: ProductoService
    ){}

  ngOnInit(): void {
    this.listProductoCategoria("remeras");
  }
  
  listProductoCategoria(categoria:string){
    this.productoService.listProductoCategoria(categoria).subscribe(
      data => {
        this.productoCategoria = data;
        console.log(data)
        console.log(this.productoCategoria)
      }
    )
  }


}
