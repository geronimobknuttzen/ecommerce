import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Preset } from '../models/presets';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private XAMPP = environment.XAMPP;

  constructor(private http: HttpClient) { }

  /* FETCH PRESETS FROM THE BACKEND */
  getAllProducts():Observable<Preset[]> {
    return this.http.get<Preset[]>(this.XAMPP + '/fetch_data.php?element=products')
  }

  getAProduct(id:number):Observable<Preset>{
    return this.http.get<Preset>(this.XAMPP + '/fetch_data.php?element=products&id='+id)
  }

}
