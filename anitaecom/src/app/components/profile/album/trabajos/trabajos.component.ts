import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.scss']
})
export class TrabajoseditComponent implements OnInit {
  
  images: any[] = [];
  image: any[] = []
  constructor(private imgSvc: ImagesService) { }

  ngOnInit(): void {
    let album = 'TRABAJOS';
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
