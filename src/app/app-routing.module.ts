import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './Components/carrito/carrito.component';
import { DetallesProductoComponent } from './Components/Detalles/detalles-producto/detalles-producto.component';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path:"detalles/:id", component: DetallesProductoComponent},
  {path:"carrito", component: CarritoComponent},
  {path:"**", redirectTo: "home"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
