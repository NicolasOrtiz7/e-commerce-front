import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/Classes/categoria';
import { Producto } from 'src/app/Classes/producto';
import { CategoriaService } from 'src/app/Services/categoria.service';
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

  // Cargar datos
  productos:any;
  categorias:any;

  constructor(private productoService: ProductoService, private categoriaService:CategoriaService){}

  ngOnInit(): void {
    this.getProductos()
    this.getCategorias()
    this.producto.categoria = this.categoria; // Asignar la categoria al producto
  }

  getProductos(){
    this.productoService.listAllProductos().subscribe(
      data => this.productos = data,
      err => console.log(err)
    )
  }

  getCategorias(){
    this.categoriaService.getCategorias().subscribe(
      data => {
        this.categorias = data
        console.log(data)
    },
      err => console.log(err)
    )
  }


  // =============================================================
  saveProducto(){
    this.productoService.saveProducto(this.producto).subscribe(
      data => alert("Producto guardado correctamente"),
      err => console.log(err)
    )
  }

  updateProducto(id:number, producto:Producto){
    this.productoService.updateProducto(id, producto).subscribe(
      data => alert("Producto actualizado correctamente"),
      err => console.log(err)
    )
  }

  deleteProducto(id:number){

    if(confirm("Seguro que deseas eliminar el producto?")){

      this.productoService.deleteProducto(id).subscribe(
        data => {alert("Producto eliminado correctamente"); this.ngOnInit()},
        err => console.log(err))

    } 
    else alert("No eliminado")
  }
  // =============================================================
  saveCategoria(){
    this.categoriaService.saveCategoria(this.categoria).subscribe(
      data => {alert("Categoria creada correctamente"); this.ngOnInit()},
      err => console.log(err)
    )
  }

  deleteCategoria(id:number){

    if(confirm("Seguro que deseas eliminar la categoria?")){

      this.categoriaService.deleteCategoria(id).subscribe(
        data => {alert("Categoria eliminada correctamente"); this.ngOnInit()},
        err => console.log(err))

    } 
    else alert("No eliminado")
  }

}
