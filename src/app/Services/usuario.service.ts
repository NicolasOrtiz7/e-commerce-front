import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../Classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL = "http://localhost:8080/usuarios"

  constructor(private http:HttpClient) { }

  getUsuarios(){

  }

  getUsuarioById(){

  }

  saveUsuario(usuario:Usuario){
    return this.http.post(this.URL + "/nuevo", usuario);
  }

  updateUsuario(){

  }

  deleteUsuario(){

  }




}
