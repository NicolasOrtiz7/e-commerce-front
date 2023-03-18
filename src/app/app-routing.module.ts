import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './Components/Admin/admin-home/admin-home.component';
import { CarritoComponent } from './Components/Carrito/carrito.component';
import { FinalizarCompraComponent } from './Components/Carrito/finalizar-compra/finalizar-compra.component';
import { DetallesProductoComponent } from './Components/Detalles/detalles-producto/detalles-producto.component';
import { DetallesUsuarioComponent } from './Components/Detalles/detalles-usuario/detalles-usuario.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { AuthGuard } from './Security/Helpers/auth.guard';
import { LoginComponent } from './Security/login/login.component';

const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path:"detalles/:id", component: DetallesProductoComponent},
  {path:"carrito", component: CarritoComponent},
  {path:"productos", component: ProductosComponent},
  {path:"admin", component: AdminHomeComponent, canActivate: [AuthGuard]},
  {path:"finalizar-compra", component: FinalizarCompraComponent},
  {path:"testing", component: DetallesUsuarioComponent},
  {path:"login", component: LoginComponent},
  {path:"**", redirectTo: "home"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
