import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../Classes/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  URL = "http://localhost:8080/productos"

  constructor(private http:HttpClient) { }

  getAllProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.URL + "/listar");
  }

  getProductoId(id:number): Observable<Producto>{
    return this.http.get<Producto>(this.URL + "/listar/"+id);
  }

  getProductoCategoria(cat: string, orden:string) {
    const filtro = { params: { categoria: cat, orden:orden } };
    return this.http.get(this.URL + '/categoria', filtro);
  }

  getProductoNombre(keyword:string) {
    const filtro = { params: { search: keyword} };
    return this.http.get(this.URL + '/filtrar', filtro);
  }

  saveProducto(producto:Producto){
    return this.http.post(this.URL + "/admin/nuevo", producto);
  }

  updateProducto(id:number, producto:Producto): Observable<any>{
    return this.http.put(this.URL + "/admin/edit/" + id, producto);
  }

  deleteProducto(id:number): Observable<any>{
    return this.http.delete(this.URL + "/admin/delete/" + id);
  }




}
