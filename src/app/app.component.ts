import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from './Classes/producto';
import { CarritoService } from './Services/carrito.service';
import { Carrito } from './Classes/carrito';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  carritoDeCompras: any = []

  constructor(
    private carritoService: CarritoService, private router: Router) { }

  ngOnInit(): void {
    this.getCarrito(2) // el 2 no sirve de nada, despues lo tengo que borrar
    this.getCarritoFromLocalStorage()
  }

  comprar() { this.router.navigate(["/carrito"]) }


  getCarrito(id: number) {
    if(localStorage.getItem("currentUser") && localStorage.getItem("token")){

      this.carritoService.getCarrito(/*id*/).subscribe(
        data => this.carritoDeCompras = data,
        err =>{
          // Un posible error es que el token esté expirado, entonces lo elimino del localStorage
          if(localStorage.getItem('currentUser')){
            localStorage.removeItem("currentUser");
            localStorage.removeItem("token");
            location.reload();
          }else{
            console.log(err)
          }
        } )
    }
  }

  deleteCarrito(id: number) {
    this.carritoService.cleanCarrito(id).subscribe(
      data => {
        console.log("Producto eliminado. ID: " + id)
        this.getCarrito(2)
      },
      err => { console.log(err) }
    )
  }

  // ##########################################################
  // Carrito de compras en localStorage

  carritoLocalStorage: Carrito[] = [];

  addProductoLocalStorage(){
    localStorage.setItem("cart", JSON.stringify(this.carritoLocalStorage));
  }

  getCarritoFromLocalStorage(){
    if(localStorage.getItem("cart")){
      let asd = localStorage.getItem("cart");
      if(asd !== null)
         this.carritoLocalStorage = JSON.parse(asd)
    }
  }

  addQuantity(carrito: Carrito) {
    // Encuentra el índice del objeto en el carrito basándote en el id del producto
    const index = this.carritoLocalStorage.findIndex(item => item.productos.id === carrito.productos.id);
  
    // Verifica si se encontró el objeto en el carrito
    if (index !== -1) {
      // Aumenta la cantidad del objeto recibido por parámetro
      this.carritoLocalStorage[index].cantidad++;
    } else {
      this.carritoLocalStorage.push(carrito);
    }
  
    // Actualiza el localStorage con el carrito modificado
    localStorage.setItem("cart", JSON.stringify(this.carritoLocalStorage));
  }
  
  

  removeQuantity(carrito: Carrito) {
    const index = this.carritoLocalStorage.findIndex(item => item.productos.id === carrito.productos.id);
  
    if (index !== -1) {
      if (this.carritoLocalStorage[index].cantidad > 1) {
        this.carritoLocalStorage[index].cantidad--;
      } else {
        this.carritoLocalStorage.splice(index, 1); // Elimina el objeto del array
      }
  
      localStorage.setItem("cart", JSON.stringify(this.carritoLocalStorage));
    } else {
      console.error('El objeto no se encuentra en el carrito.');
    }
  }

  cleanProductoFromCart(carrito: Carrito){
    const index = this.carritoLocalStorage.findIndex(item => item.productos.id === carrito.productos.id);
    this.carritoLocalStorage.splice(index, 1);
    }

  productExistsInCart(carrito:Carrito){
    return this.carritoLocalStorage.findIndex(item => item.id === carrito.id);
  }






}
