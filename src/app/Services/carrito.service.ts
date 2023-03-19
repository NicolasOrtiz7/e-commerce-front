import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carrito } from '../Classes/carrito';
import { Producto } from '../Classes/producto';
import { LoginService } from '../Security/login.service';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  URL = 'http://localhost:8080/carrito';

  // Este servicio es para agregar productos al carrito de compras

  // Debe estar inicializado vacío
  carrito: Producto[] = []; // esta ya no lo uso mas, eliminar

  constructor(
    private http: HttpClient,
    private loginService:LoginService
    ) { }

  // ====================================================

  // Copiar estas funciones a la nueva forma y eliminarlas

  carritoSet = new Set<Producto>();

  totalPriceELIMINAR(): number {
    // Calcula el precio total del carrito
    let totalPrice = 0;
    this.carritoSet.forEach((p) => {
      totalPrice += p.precio;
    });
    console.log('EL precio total del carrito es: ' + totalPrice);
    return totalPrice;
  }

  // ====================================================

  getUsuarioActual() {
    return this.http.get('http://localhost:8080/usuarios' + '/listar/' + this.loginService.getCurrentUser());
  }

  // Recibe todos los carritos de compras de todos los usuarios (no usar para nada)
  getAllCarritos() {
    return this.http.get(this.URL + '/listar');
  }

  // Obtiene el carrito del usuario logeado
  //  (puede falsificarse el usuario cambiando el valor del id en el localStorage, arreglar)
  getCarrito() {
    console.log("El usuario logeado es " + this.loginService.getCurrentUser())
    return this.http.get(this.URL + '/listar/' + this.loginService.getCurrentUser());
  }

  addProduct(carrito: Carrito) {
    return this.http.post(this.URL + '/nuevo', carrito);
  }

  subtractProduct(carrito: Carrito) {
    return this.http.post(this.URL + '/restar', carrito);
  }

  cleanProducto(id: number) {
    return this.http.delete(this.URL + '/eliminar/producto/' + id);
  }

  cleanCarrito(id: number) {
    return this.http.delete(this.URL + '/eliminar/' + id);
  }


  // ====================================================================================

  // Métodos que ejecutan las peticiones

  //  HACER:
  //    - Que se agregue o reste la cantidad dependiendo el número del input (por ahora está disabled)

  // Añade un producto al carrito si no existe, y si existe le aumenta la cantidad
  addProductImpl(carrito: Carrito) {
    this.addProduct(carrito).subscribe(
      data => console.log('Producto agregado al carrito'),
      err => console.log(err))
  }


  // Resta cantidad de un producto del carrito si existe, o lo elimina si la cantidad es 0
  subtractProductImpl(carrito: Carrito) {
    if (carrito.cantidad == 0) { // Si la cantidad del producto llega a 0, se elimina
      this.cleanCarrito(carrito.id).subscribe(
        data => console.log('Carrito limpiado'))
    }

    if (carrito.cantidad > 0) { // Si el producto existe en el carrito, se le resta 1
      this.subtractProduct(carrito).subscribe(
        data => console.log('Restado 1 cantidad'));
    } else console.log('Error, la cantidad no puede ser negativa');
  }

  cleanProductoImpl(id: number) {
    this.cleanProducto(id).subscribe(data => console.log("Producto eliminado"), err => console.log(err))
  }


  totalPriceCarrito() {
    let totalPrice = 0;
    this.carritoSet.forEach((p) => {
      totalPrice += p.precio;
    });
    console.log('EL precio total del carrito es: ' + totalPrice);
    return totalPrice;
  }

  // Hay que arreglar este método usando promesas (o async await, no me acuerdo cual)
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
      },
      err => {
        console.log(err);
      }
    )
  }

}