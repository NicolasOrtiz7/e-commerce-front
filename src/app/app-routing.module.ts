import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './Components/Admin/admin-home/admin-home.component';
import { CarritoComponent } from './Components/carrito/carrito.component';
import { DetallesProductoComponent } from './Components/Detalles/detalles-producto/detalles-producto.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductosComponent } from './Components/productos/productos.component';

const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path:"detalles/:id", component: DetallesProductoComponent},
  {path:"carrito", component: CarritoComponent},
  {path:"productos", component: ProductosComponent},
  {path:"admin", component: AdminHomeComponent},
  {path:"**", redirectTo: "home"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
