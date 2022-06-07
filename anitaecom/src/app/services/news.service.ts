import { ICarrouselItem } from './../models/icarrusel-items.metadata';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) { }

  showMessage(){
    console.log('SERVICIO FUNCIONANDO')
  }

  /* FETCH NEWS FROM THE BACKEND */
  getNews():Observable<ICarrouselItem[]> {
    return this.http.get<ICarrouselItem[]>(this.SERVER_URL+'/news')
  }

  postNews(){

  }
}
