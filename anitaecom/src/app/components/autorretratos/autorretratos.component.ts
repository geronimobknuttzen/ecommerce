import { ImagesService } from './../../services/images.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autorretratos',
  templateUrl: './autorretratos.component.html',
  styleUrls: ['./autorretratos.component.scss']
})
export class AutorretratosComponent implements OnInit {
 
  images: any[] = [];

  constructor(private imgSvc: ImagesService) { }

  ngOnInit(): void {
    let album = 'AUTORRETRATOS';
    this.imgSvc.getPortfolioImg(album).subscribe((img: any)=>{
      this.images = img.images
    })
  }

}
