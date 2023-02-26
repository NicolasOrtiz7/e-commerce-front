import { Categoria } from "./categoria";

export class Producto {

    id_producto:number;
    nombre:string;
    descripcion:string;
    imagen:string;
    precio:number;
    cantidad:number;
    categoria:Categoria;

    cantidadCarrito:number;


}
