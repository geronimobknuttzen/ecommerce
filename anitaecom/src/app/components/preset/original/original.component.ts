import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-original',
  templateUrl: './original.component.html',
  styleUrls: ['./original.component.scss']
})
export class OriginalComponent implements OnInit {
  presets: any[] = [
    {id:1 , desc: 'atardecer'},
    {id:2 , desc: 'bajando'},
    {id:3 , desc: 'blancoynaranja'},
    {id:4 , desc: 'detalle'},
    {id:5 , desc: 'nevando'},
    {id:6 , desc: 'feliz'},
    {id:7 , desc: 'lavado'},
    {id:8 , desc: 'noche'},
    {id:9 , desc: 'otonio'},
    {id:10 , desc: 'suave'},
    {id:11 , desc: 'verano'},
    {id:12 , desc: 'yinyang'}
  ]
  constructor() { }

  ngOnInit(): void {
    this.getPresets()
  }
  getPresets(){
    return this.presets
  }
}
