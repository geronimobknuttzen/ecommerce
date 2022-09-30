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
private XAMPP = environment.XAMPP;

  constructor(private http: HttpClient) {
  }
  uploadFile(File):Observable<any>{
   const json = File;
   return this.http.post(`${this.XAMPP}/upload.php`, json)
  }

  uploadNew(File):Observable<any>{
   const json = File;
   return this.http.post(`${this.XAMPP}/upload.php`, json)
  }

  getUploads():Observable<any>{
   return this.http.get(`${this.XAMPP}/fetch_data.php?element=images`)
  }
}
