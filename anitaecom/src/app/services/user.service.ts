import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
auth: boolean = false;
private SERVER_URL = environment.SERVER_URL;
private user;
authStatus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.auth)
userData$: BehaviorSubject<ResponseModel> = new BehaviorSubject<ResponseModel>(null)

  constructor(
    private http: HttpClient,
    ) { }
    loginUser(email:string, password: string){
      this.http.post(`${this.SERVER_URL}/auth/login`, {email, password})
        .subscribe((data:ResponseModel):void=>{
          this.auth = data.auth;
          this.authStatus$.next(this.auth);
          this.userData$.next(data);
          console.log(data)
        });
    }
    signOut(): void {
      this.auth = false;
      this.authStatus$.next(this.auth)
    }
    refreshToken(): void {
    }

}

export interface ResponseModel{
  token: string,
  auth: boolean,
  email: string,
  username: string,
  nombre: string,
  apellido: string,
  photoUrl: string,
  userId: number
}