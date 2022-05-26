import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Preset } from '../models/presets';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) { }

  showMessage(){
    console.log('SERVICIO FUNCIONANDO')
  }

  /* FETCH PRESETS FROM THE BACKEND */
  getAllProducts():Observable<Preset[]> {
    return this.http.get<Preset[]>(this.SERVER_URL+'/presets')
  }
}
