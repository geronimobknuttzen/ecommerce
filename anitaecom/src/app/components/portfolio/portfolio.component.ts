import { Component, OnInit } from '@angular/core';
import { AlbumsService } from 'src/app/services/albums.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  albums:any[] = [];

  constructor(private albumSvc: AlbumsService) { }

  ngOnInit(): void {
    this.albumSvc.showMessage();
    this.albumSvc.getAllAlbums().subscribe((album: any)=>{
      this.albums = album.albums
      console.log(this.albums) 
    })
  }

}