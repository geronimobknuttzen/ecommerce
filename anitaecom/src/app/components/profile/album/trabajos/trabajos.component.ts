import { Router } from '@angular/router';
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
  constructor(
    private imgSvc: ImagesService,
    private router: Router
    ) { }

  ngOnInit(): void {
    let album:number = 2;
    this.imgSvc.getPortfolioImg(album).subscribe((img: any)=>{
      this.images = img
    })
  }
  delete(id){
    console.log(id)
    this.imgSvc.deleteImg(id).subscribe((img: any)=>{
      this.router.navigate(['/profile/', 'deleteOk']);
    })
  }
}
