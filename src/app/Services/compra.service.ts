import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carrito } from '../Classes/carrito';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  URL = "http://localhost:8080/compras"

  constructor(private http:HttpClient) { }

  getCompras(){
    return this.http.get(this.URL + "/listar");
  }

  getUsuarioCompras(id:number){
    return this.http.get(this.URL + "/listar/" + id);
  }

  saveCompra(carrito:Carrito){
    return this.http.post(this.URL + "/save", carrito);
  }

  getByIdOrUsername(keyword:string){
    return this.http.get(this.URL + "/filtrar?keyword=" + keyword);
  }

}
