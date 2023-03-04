import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/Classes/categoria';
import { Producto } from 'src/app/Classes/producto';
import { ProductoService } from 'src/app/Services/producto.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit{

  // Para crear nuevos
  producto:Producto = new Producto;
  categoria:Categoria = new Categoria;

  // Cargar categorías
  categorias:any;

  constructor(private productoService: ProductoService){}

  ngOnInit(): void {
    this.getCategorias()
  }

  getCategorias(){
    this.productoService.getCategorias().subscribe(
      data => {
        this.categorias = data
        console.log(data)
    },
      err => console.log(err)
    )
  }

  saveProducto(){
    // Al guardar un producto con categoria da error porque necesita recibir un objeto Categoria
    console.log(this.producto)
    
    this.productoService.saveProducto(this.producto).subscribe(
      data => console.log("Producto guardado correctamente"),
      err => console.log(err)
    )
  }

  updateProducto(id:number, producto:Producto){
    this.productoService.updateProducto(id, producto).subscribe(
      data => console.log("Producto actualizado correctamente"),
      err => console.log(err)
    )
  }

  deleteProducto(id:number){
    this.productoService.deleteProducto(id).subscribe(
      data => console.log("Producto eliminado correctamente"),
      err => console.log(err)
    )
  }

}
