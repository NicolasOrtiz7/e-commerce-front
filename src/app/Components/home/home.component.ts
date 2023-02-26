import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/Classes/producto';
import { ProductoService } from 'src/app/Services/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  productos:Producto[];
  productoCategoria: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private productoService: ProductoService
    ){}

    ngOnInit(){
      this.listAllProductos();
    }

    listAllProductos(){
      this.productoService.listAllProductos().subscribe(
        data => {
          this.productos = data;
        },
        err => {console.log(err)}
      )
    }

    


}
