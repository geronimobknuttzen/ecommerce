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
  
  userToken = environment.ACCESS_TOKEN_IG
  queryUrl = `me/media?access_token=${this.userToken}&fields=id,username,timestamp,caption,media_url,media_type,permalink`;
  fullUrl = `${this.instagramBaseGRAPH}` + `${this.queryUrl}`;    
  constructor(private http: HttpClient) { }
  
  getInstagram():Observable<Instafeed[]> {
    return this.http.get<Instafeed[]>(this.fullUrl)
  }
}
