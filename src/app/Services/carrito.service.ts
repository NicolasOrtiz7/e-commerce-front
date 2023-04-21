import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carrito } from '../Classes/carrito';
import { Producto } from '../Classes/producto';
import { LoginService } from '../Security/login.service';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {

  URL_CARRITO = 'http://localhost:8080/carrito';
  URL_USUARIOS = 'http://localhost:8080/usuarios';

  constructor(
    private http: HttpClient,
    private loginService:LoginService
    ) { }

  // ====================================================
  // Para armar un carrito cuando un usuario no está logeado. No eliminar

  carritoSet = new Set<Producto>();

  // Calcula el precio total del carrito
  totalPriceELIMINAR(): number {
    let totalPrice = 0;
    this.carritoSet.forEach((p) => {
      totalPrice += p.precio;
    });
    console.log('EL precio total del carrito es: ' + totalPrice);
    return totalPrice;
  }

  // ====================================================

  getUsuarioActual() {
    return this.http.get(this.URL_USUARIOS + '/listar/' + this.loginService.getCurrentUser());
  }


  // Obtiene el carrito del usuario logeado
  //  (puede falsificarse el usuario cambiando el valor del id en el localStorage, arreglar)
  getCarrito() {
    console.log("El usuario logeado es " + this.loginService.getCurrentUser())
    return this.http.get(this.URL_CARRITO + '/listar/' + this.loginService.getCurrentUser());
  }

  addProducto(carrito: Carrito) {
    return this.http.post(this.URL_CARRITO + '/nuevo', carrito);
  }

  subtractProducto(carrito: Carrito) {
    return this.http.post(this.URL_CARRITO + '/restar', carrito);
  }

  cleanProducto(id: number) {
    return this.http.delete(this.URL_CARRITO + '/eliminar/producto/' + id);
  }

  cleanCarrito(id: number) {
    return this.http.delete(this.URL_CARRITO + '/eliminar/' + id);
  }


  // ====================================================================================
  // Métodos que se suscriben a las peticiones (para evitar código repetivo en cada componente)


  // Añade un producto al carrito si no existe, y si existe le aumenta la cantidad
  addProductSub(carrito: Carrito) {
    this.addProducto(carrito).subscribe(
      data => console.log('Producto agregado al carrito'),
      err => console.log(err))
  }


  // Resta cantidad de un producto del carrito si existe, o lo elimina si la cantidad es 0
  subtractProductSub(carrito: Carrito) {
    if (carrito.cantidad == 0) { // Si la cantidad del producto llega a 0, se elimina
      this.cleanCarrito(carrito.id).subscribe(
        data => console.log('Carrito limpiado'))
    }

    if (carrito.cantidad > 0) { // Si el producto existe en el carrito, se le resta 1
      this.subtractProducto(carrito).subscribe(
        data => console.log('Restado 1 cantidad'));
    } else console.log('Error, la cantidad no puede ser negativa');
  }


  cleanProductoSub(id: number) {
    this.cleanProducto(id).subscribe(data => console.log("Producto eliminado"), err => console.log(err))
  }

  // Para calcular el precio del carrito cuando un usuario no está logeado (agregar)
  totalPriceCarrito() {
    let totalPrice = 0;
    this.carritoSet.forEach((p) => {
      totalPrice += p.precio;
    });
    console.log('EL precio total del carrito es: ' + totalPrice);
    return totalPrice;
  }
  

  // Hay que hacer esta función con promesas
  // Este dato deberia traerlo desde el back end, agregarlo
  precioTotal: number
  totalPrice() {
    let totalPrice = 0;
    let pxq = 0;
    let arrayTemporal: any = [];
    this.getCarrito().subscribe(
      data => {
        arrayTemporal = data;
        arrayTemporal.forEach(
          (p: { cantidad: number; productos: { precio: number; }; }) => {

            pxq = p.cantidad * p.productos.precio;
            totalPrice += pxq
          }
        )
        this.precioTotal = totalPrice
      }, err => console.log(err)
    )
  }

}