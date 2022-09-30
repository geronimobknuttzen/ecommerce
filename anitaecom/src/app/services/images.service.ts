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
export class ImagesService {

  private XAMPP = environment.XAMPP;

  constructor(
    private http: HttpClient,
    private toaster: ToastrService,
    private router: Router
    ) { }

  /* FETCH IMAGES FROM THE BACKEND */
  getAllImages():Observable<Image[]> {
    return this.http.get<Image[]>(this.XAMPP+'/fetch_data.php?element=images')
  }
  getImage(id:number):Observable<Image[]>{
    return this.http.get<Image[]>(this.XAMPP+'/fetch_data.php?element=images&id='+ id)
  }
  /* FETCH IMAGES BY ALBUM FROM THE BACKEND */
  getPortfolioImg(album:number):Observable<Image[]> {
    return this.http.get<Image[]>(this.XAMPP+'/fetch_data.php?element=images&cat_id=' + album)
  }
    /* DELETE IMAGE FROM THE BACKEND */
  deleteImg(id:number):Observable<Image[]>{
    console.log(id)
    let msg;
    if (window.confirm('Está seguro que quiere eliminar este item')) {
      this.toaster.success(
        'Eliminada',
        `Imagen`,
        {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-full-width',
        }
        );
        this.router.navigate([this.router.url]);
      return this.http.delete<Image[]>(this.XAMPP + `/delete.php?element=images&id=${id}`)
    }
    this.toaster.info(
      'no eliminada',
      `Imagen`,
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