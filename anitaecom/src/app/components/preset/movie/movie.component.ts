import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
presets: any[] = [
  {id:1 , desc: 'acantilado'},
  {id:2 , desc: 'desert'},
  {id:3 , desc: 'hollywood'},
  {id:4 , desc: 'margaritas'},
  {id:5 , desc: 'nubes'},
  {id:6 , desc: 'ruta'},
  {id:7 , desc: 'verdeagua'}
]
  constructor() { }

  ngOnInit(): void {
    this.getPresets()
  }
  getPresets(){
    return this.presets
  }
}