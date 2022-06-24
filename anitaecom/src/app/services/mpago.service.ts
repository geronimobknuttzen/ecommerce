import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MPServer } from '../models/mp';

@Injectable({
  providedIn: 'root'
})
export class MpagoService {
  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) { }

  getMPorder(orderId:number){
    return this.http.get<MPServer[]>(this.SERVER_URL + '/mp/feedback/' + orderId).toPromise()
  }
}
