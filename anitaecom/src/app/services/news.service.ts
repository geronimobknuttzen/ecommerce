import { ICarrouselItem } from './../models/icarrusel-items.metadata';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Image } from '../models/image';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private SERVER_URL = environment.SERVER_URL;

  constructor(
    private http: HttpClient,
    private toaster: ToastrService,
    private router: Router) { }

  showMessage(){
    console.log('SERVICIO FUNCIONANDO')
  }

  /* FETCH NEWS FROM THE BACKEND */
  getNews():Observable<ICarrouselItem[]> {
    return this.http.get<ICarrouselItem[]>(this.SERVER_URL+'/news')
  }

  deleteNew(id:number):Observable<Image[]>{
    console.log(id)
    let msg;
    if (window.confirm('Está seguro que quiere eliminar este item')) {
      this.toaster.success(
        'Eliminada',
        `News`,
        {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-full-width',
        }
        );
        this.router.navigate([this.router.url]);
      return this.http.delete<Image[]>(this.SERVER_URL + `/news/delete/${id}`)
    }
    this.toaster.info(
      'no eliminada',
      `News`,
      {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-full-width',
      }
    );
    return msg; 
  }
}
