import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root'
})

export class AlbumsService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) { }

  showMessage(){
    console.log('SERVICIO FUNCIONANDO')
  }

  /* FETCH ALBUMS FROM THE BACKEND */
  getAllAlbums():Observable<Album[]> {
    return this.http.get<Album[]>(this.SERVER_URL+'/portfolios')
  }
}
