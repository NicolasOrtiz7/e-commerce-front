import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/statics/navbar/navbar.component';
import { CardComponent } from './Components/cards/card-producto/card.component';
import { LoginComponent } from './Components/statics/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { CategoriaComponent } from './Components/cards/card-categoria/categoria.component';
import { FooterComponent } from './Components/statics/footer/footer.component';
import { CarritoComponent } from './Components/carrito/carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CardComponent,
    LoginComponent,
    HomeComponent,
    CategoriaComponent,
    FooterComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
