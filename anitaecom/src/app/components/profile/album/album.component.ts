import { Component, OnInit } from '@angular/core';
import { AlbumsService } from 'src/app/services/albums.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  albums:any[] = [];
  constructor(private albumSvc: AlbumsService) { }

  ngOnInit(): void {
    this.albumSvc.getAllAlbums().subscribe((album: any)=>{
      this.albums = album.albums
    })
  }

}
