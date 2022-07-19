import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Archivo } from '../models/image';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class UploadService {
public url: string;
private SERVER_URL = environment.SERVER_URL;
private SERVER_XAMPP = environment.SERVER_XAMPP;

  constructor(private http: HttpClient) {
  }
  uploadFile(File):Observable<any>{
   const json = File;
   return this.http.post(`${this.SERVER_XAMPP}/upload.php`, json)
  }

  uploadNew(File):Observable<any>{
   const json = File;
   return this.http.post(`${this.SERVER_XAMPP}/upload.php`, json)
  }

  getUploads():Observable<any>{
   return this.http.get(`${this.SERVER_URL}/images`)
  }
}
