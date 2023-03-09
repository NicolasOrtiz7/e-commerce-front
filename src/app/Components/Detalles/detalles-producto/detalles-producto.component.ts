import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/Classes/producto';
import { ProductoService } from 'src/app/Services/producto.service';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.css']
})
export class DetallesProductoComponent implements OnInit{

  producto:Producto;
  id:number =1;

  constructor(private productoService:ProductoService, private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.id = +idParam;
        this.getDetails(this.id);
      }
    });
  }

  getDetails(id:number){
    this.productoService.listProductoId(id).subscribe(
      data => this.producto = data,
      err => console.log(err)
    )
  }
  }


