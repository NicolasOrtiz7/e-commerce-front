import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/Classes/categoria';
import { Producto } from 'src/app/Classes/producto';
import { CarritoService } from 'src/app/Services/carrito.service';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { CompraService } from 'src/app/Services/compra.service';
import { ProductoService } from 'src/app/Services/producto.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  // Para crear nuevos
  producto: Producto = new Producto;
  categoria: Categoria = new Categoria;

  // Cargar datos
  productos: any;
  categorias: any;

  constructor(private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private carritoService: CarritoService,
    private compraService: CompraService) { }

  ngOnInit(): void {
    this.producto.categoria = this.categoria; // Asignar la categoria al producto
    this.getCategorias()
    this.getProductos()
  }

  getProductoById(id: number) {
    this.productoService.getProductoId(id).subscribe(
      data => this.producto = data,
      err => console.log(err))
  }

  getProductos() {
    this.productoService.getAllProductos().subscribe(
      data => this.productos = data,
      err => console.log(err))
  }

  getCategoriaById(id: number) {
    this.categoriaService.getCategoriaById(id).subscribe(
      data => this.categoria = data,
      err => console.log(err))
  }

  getCategorias() {
    this.categoriaService.getCategorias().subscribe(
      data => this.categorias = data,
      err => console.log(err))
  }


  // =============================================================

  saveProducto() {
    this.productoService.saveProducto(this.producto).subscribe(
      data => alert("Producto guardado correctamente"),
      err => console.log(err)
    )
  }

  updateProducto(id: number, producto: Producto) {
    this.productoService.updateProducto(id, producto).subscribe(
      data => alert("Producto actualizado correctamente"),
      err => console.log(err)
    )
  }

  deleteProducto(id: number) {
    if (confirm("Seguro que deseas eliminar el producto?")) {
      this.productoService.deleteProducto(id).subscribe(
        data => { alert("Producto eliminado correctamente"); this.ngOnInit() },
        err => console.log(err))
    } else alert("No eliminado")
  }


  // =============================================================

  saveCategoria() {
    this.categoriaService.saveCategoria(this.categoria).subscribe(
      data => { alert("Categoria creada correctamente"); this.ngOnInit() },
      err => console.log(err)
    )
  }

  updateCategoria(id: number, categoria: Categoria) {
    this.categoriaService.updateCategoria(id, categoria).subscribe(
      data => alert("Categoria editada correctamente"),
      err => console.log(err)
    )
  }

  deleteCategoria(id: number) {
    if (confirm("Seguro que deseas eliminar la categoria?")) {
      this.categoriaService.deleteCategoria(id).subscribe(
        data => { alert("Categoria eliminada correctamente"); this.ngOnInit() },
        err => console.log(err))
    } else alert("No eliminado")
  }

  // =============================================================

  compras: any = [];
  getCompras() {
    this.compraService.getCompras().subscribe(
      data => {
        this.compras = data
      },
      err => console.log(err)
    )
  }

  idOrUsername: any;
  getComprasById(id: string) {
    this.compraService.getByIdOrUsername(id).subscribe(
      data => {
        this.compras = data
        console.log(this.compras)
      }
    )
  }

}

// Al presionar el botón de editar lanza algunos errores en consola, pero
// funciona bien al editar y guardar.
// Al recargar la página, las imágenes no se cargan al apretar el botón de editar (el nombre de la imagen)
