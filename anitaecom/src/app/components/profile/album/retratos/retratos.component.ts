import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-retratos',
  templateUrl: './retratos.component.html',
  styleUrls: ['./retratos.component.scss']
})
export class RetratoseditComponent implements OnInit {
  images: any[] = [];
  image: any[] = []
  constructor(
    private imgSvc: ImagesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let album = 'RETRATOS';
    this.imgSvc.getPortfolioImg(album).subscribe((img: any)=>{
      this.images = img.images
      console.log(this.images)
    })
  }
  delete(id){
    console.log(id)
    this.imgSvc.deleteImg(id).subscribe((img: any)=>{
      this.router.navigate(['/profile/', 'deleteOk']);
    })
  }
}
