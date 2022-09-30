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

  private XAMPP = environment.XAMPP;

  constructor(private http: HttpClient) { }

  /* FETCH ALBUMS FROM THE BACKEND */
  getAllAlbums():Observable<Album[]> {
    return this.http.get<Album[]>(this.XAMPP+'/fetch_data.php?element=categories')
  }
}
