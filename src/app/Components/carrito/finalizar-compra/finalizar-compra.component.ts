import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/Classes/carrito';
import { Tarjeta } from 'src/app/Classes/tarjeta';
import { Usuario } from 'src/app/Classes/usuario';
import { CarritoService } from 'src/app/Services/carrito.service';
import { CompraService } from 'src/app/Services/compra.service';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.component.html',
  styleUrls: ['./finalizar-compra.component.css']
})
export class FinalizarCompraComponent implements OnInit{

  // IMPORTANTE: Hay que cambiar el name="" a los inputs de cada formulario

  usuario:Usuario = new Usuario();
  carrito:any = [];
  tarjeta:Tarjeta = new Tarjeta();

  // Direccion
  calle:string;
  numero_casa:string;
  provincia:string;
  ciudad:string;

  constructor(
    private usuarioService:UsuarioService,
    private carritoService:CarritoService,
    private compraService:CompraService){}

  ngOnInit(): void {
    this.getCarritoById();
  }

  usuarioActual:Usuario;

  getCarritoById(){
    this.carritoService.getCarrito().subscribe(
      data => this.carrito = data,
      err => console.log(err)
    )
  }

  saveCompra(){
    console.log("Guardando compra")
    this.compraService.saveCompra(this.carrito).subscribe(
      data => {
        console.log("Compra exitosa");
        this.carritoService.cleanCarrito(this.carrito[0].usuario.id).subscribe();
    },err => console.log(err))
  }

  saveUsuario(){

    console.log("Guardando usuario")

    this.usuario.direccion = `Calle: ${this.calle}, Número: ${this.numero_casa}, Provincia: ${this.provincia}, Ciudad: ${this.ciudad} `

    this.usuarioService.saveUsuario(this.usuario).subscribe(data => console.log("Usuario guardado"))
  }


  // Falta la validación para que no se pueda comprar cuando el carrito de compras está vacío
  buy(){
    console.log("Intentando compra")
    this.saveUsuario();
    this.saveCompra();
  }




  // ##################################################

  // Pasar al siguiente formulario

  formStep:number = 1; // Cambiar los *ngIf

  next(){
    this.formStep++
  }

  back(){
    this.formStep--
  }

}
