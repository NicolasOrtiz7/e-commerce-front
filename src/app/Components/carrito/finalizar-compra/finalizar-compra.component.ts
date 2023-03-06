import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.component.html',
  styleUrls: ['./finalizar-compra.component.css']
})
export class FinalizarCompraComponent implements OnInit{

  // IMPORTANTE: Hay que cambiar el name="" a los inputs de cada formulario

  constructor(){}

  ngOnInit(): void {
      
  }

  formStep:number = 1;

  next(){
    this.formStep++
  }

  back(){
    this.formStep--
  }

}
