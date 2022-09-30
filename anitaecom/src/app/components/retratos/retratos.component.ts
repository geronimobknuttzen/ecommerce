import { ImagesService } from './../../services/images.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retratos',
  templateUrl: './retratos.component.html',
  styleUrls: ['./retratos.component.scss']
})
export class RetratosComponent implements OnInit {
  
  images: any[] = [];

  constructor(private imgSvc: ImagesService) { }

  ngOnInit(): void {
    let album:number = 1;
    this.imgSvc.getPortfolioImg(album).subscribe((img: any)=>{
      this.images = img
    })
  }

}
