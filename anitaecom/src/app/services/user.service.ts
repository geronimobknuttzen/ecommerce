import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login'
import { FacebookLoginProvider, GoogleLoginProvider } from "@abacritt/angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class UserService {
auth: boolean = false;
private SERVER_URL = environment.SERVER_URL;
private user;
authStatus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.auth)
userData$: BehaviorSubject<SocialUser | ResponseModel> = new BehaviorSubject<SocialUser | ResponseModel>(null)

  constructor(
    private authSvc: SocialAuthService,
    private http: HttpClient,
    ) {
      authSvc.authState.subscribe((user: SocialUser):void=>{
        if(user !== null){
          this.auth = true;
          this.authStatus$.next(this.auth);
          this.userData$.next(user)
        }
      });      
    }
    loginUser(email:string, password: string){
      this.http.post(`${this.SERVER_URL}/auth/login`, {email, password})
        .subscribe((data:ResponseModel):void=>{
          this.auth = data.auth;
          this.authStatus$.next(this.auth);
          this.userData$.next(data);
        });
    }
    // Google Auth

    signInWithGoogle(): void {
      this.authSvc.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
    signInWithFB(): void {
      this.authSvc.signIn(FacebookLoginProvider.PROVIDER_ID);
    }
  
    signOut(): void {
      this.authSvc.signOut();
      this.auth = false;
      this.authStatus$.next(this.auth)
    }
    refreshToken(): void {
      this.authSvc.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
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