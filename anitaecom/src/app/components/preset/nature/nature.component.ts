import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nature',
  templateUrl: './nature.component.html',
  styleUrls: ['./nature.component.scss']
})
export class NatureComponent implements OnInit {
  presets: any[] = [
    {id:1 , desc: 'arena'},
    {id:2 , desc: 'avion'},
    {id:3 , desc: 'hotel'},
    {id:4 , desc: 'jungla'},
    {id:5 , desc: 'moody'},
    {id:6 , desc: 'mountain'},
    {id:7 , desc: 'pileta'}
  ]
  constructor() { }

  ngOnInit(): void {
    this.getPresets()
  }
  getPresets(){
    return this.presets
  }

}
