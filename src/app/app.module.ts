import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/statics/navbar/navbar.component';
import { CardComponent } from './Components/cards/card-producto/card.component';
import { HomeComponent } from './Components/home/home.component';
import { CategoriaComponent } from './Components/cards/card-categoria/categoria.component';
import { FooterComponent } from './Components/statics/footer/footer.component';
import { CarritoComponent } from './Components/Carrito/carrito.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminHomeComponent } from './Components/Admin/admin-home/admin-home.component';
import { DetallesProductoComponent } from './Components/Detalles/detalles-producto/detalles-producto.component';
import { DetallesUsuarioComponent } from './Components/Detalles/detalles-usuario/detalles-usuario.component';
import { FinalizarCompraComponent } from './Components/Carrito/finalizar-compra/finalizar-compra.component';
import { LoginComponent } from './Security/login/login.component';
import { AuthInterceptor } from './Security/Helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CardComponent,
    HomeComponent,
    CategoriaComponent,
    FooterComponent,
    CarritoComponent,
    ProductosComponent,
    AdminHomeComponent,
    DetallesProductoComponent,
    DetallesUsuarioComponent,
    FinalizarCompraComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
