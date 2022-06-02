import { Instafeed } from './../models/instafeed';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {
  private instagramBaseGRAPH = environment.INSTAGRAM_URL_GRAPH
  
  userToken = 'IGQVJXeU5vNlVidTJ2M1YzNnplUTR2MlYtaXp4X0ZAYOVR3djl3UkhFejZAwZAXFNUmQ4bVVnVXRiNlJQNjM5OUd3RUFlNHFCTEdHa3g2XzBVLVh5VXplYlRGNHF2Q080ZAGRwQ0FGeWI1c1VEZA1ctOTFCUQZDZD'
  queryUrl = `me/media?access_token=${this.userToken}&fields=id,username,timestamp,caption,media_url,media_type,permalink`;
  fullUrl = `${this.instagramBaseGRAPH}` + `${this.queryUrl}`;    
  constructor(private http: HttpClient) { }
  
  getInstagram():Observable<Instafeed[]> {
    return this.http.get<Instafeed[]>(this.fullUrl)
  }
}
