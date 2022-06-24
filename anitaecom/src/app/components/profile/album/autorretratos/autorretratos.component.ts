import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-autorretratos',
  templateUrl: './autorretratos.component.html',
  styleUrls: ['./autorretratos.component.scss']
})
export class AutorretratoseditComponent implements OnInit {

  images: any[] = [];
  image: any[] = []
  constructor(private imgSvc: ImagesService) { }

  ngOnInit(): void {
    let album = 'AUTORRETRATOS';
    this.imgSvc.getPortfolioImg(album).subscribe((img: any)=>{
      this.images = img.images
      console.log(this.images)
    })
  }
  delete(id){
    console.log(id)
    this.imgSvc.deleteImg(id).subscribe((img: any)=>{
      window.location.reload()
    })
  }
}