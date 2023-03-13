import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carrito } from '../Classes/carrito';
import { Producto } from '../Classes/producto';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  URL = 'http://localhost:8080/carrito';

  // Este servicio es para agregar productos al carrito de compras

  // Debe estar inicializado vacío
  carrito: Producto[] = []; // esta ya no lo uso mas, eliminar

  constructor(private http: HttpClient) { }

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

  // Obtiene el usuario con ID:2 simulando que está logeado (cambiar al implementar login)
  getUsuarioActual() {
    return this.http.get('http://localhost:8080/usuarios' + '/listar/' + 2);
  }

  // Recibe todos los carritos de compras de todos los usuarios (no usar para nada)
  getAllCarritos() {
    return this.http.get(this.URL + '/listar');
  }

  // Recibe el carrito de compras de un usuario (usar cuando implemente el login)
  getCarrito(/*id:number*/) {
    return this.http.get(this.URL + '/listar/' + 2); //despues agregar el parametro id:number
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