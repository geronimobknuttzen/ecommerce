import { ImagesService } from './../../services/images.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.scss']
})
export class TrabajosComponent implements OnInit {
  
  images: any[] = [];

  constructor(private imgSvc: ImagesService) { }

  ngOnInit(): void {
    let album = 'TRABAJOS';
    this.imgSvc.showMessage();
    this.imgSvc.getPortfolioImg(album).subscribe((img: any)=>{
      this.images = img.images
      console.log(img) 
    })
  }

}
