import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/Classes/categoria';
import { CategoriaService } from 'src/app/Services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit{

  categorias:Categoria[] = [];

  constructor (private categoriaService:CategoriaService) { }

  ngOnInit(){
    this.getCategorias();
  }

  getCategorias(){
    this.categoriaService.getCategorias().subscribe(
      data => this.categorias = data,
      err => console.log(err)
    )

  }


}
