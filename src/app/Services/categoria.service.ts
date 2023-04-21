import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../Classes/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  URL = "http://localhost:8080/categorias";

  constructor(private http:HttpClient) { }

  
  getCategorias(){
    return this.http.get<Categoria[]>(this.URL + "/listar");
  }

  getCategoriaById(id:number): Observable<Categoria>{
    return this.http.get<Categoria>(this.URL + "/listar/" + id)
  }

  saveCategoria(categoria:Categoria){
    return this.http.post(this.URL + "/admin/nuevo", categoria);
  }

  updateCategoria(id:number, categoria:Categoria){
    return this.http.put(this.URL + "/admin/editar/" + id, categoria);
  }

  deleteCategoria(id:number){
    return this.http.delete(this.URL + "/admin/eliminar/" + id);
  }

}
