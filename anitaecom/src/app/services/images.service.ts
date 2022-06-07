import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) { }

  /* FETCH IMAGES FROM THE BACKEND */
  getAllImages():Observable<Image[]> {
    return this.http.get<Image[]>(this.SERVER_URL+'/images')
  }

  /* FETCH IMAGES BY ALBUM FROM THE BACKEND */
  getPortfolioImg(album:string):Observable<Image[]> {
    return this.http.get<Image[]>(this.SERVER_URL + '/portfolios/portfolio/' + album)
  }
}