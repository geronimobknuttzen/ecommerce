import { Router } from '@angular/router';
import { ResponseModel, UserService } from './../../services/user.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
myUser: any;

  constructor(
    private authSvc: SocialAuthService,
    private userSvc: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userSvc.userData$
      .pipe(
        map((user:SocialUser|ResponseModel)=>{
          if(user instanceof SocialUser){
            return {
              ... user,
              email: 'test@test.com'
            };
          } else {
            return user;
          }
        })
      )
      .subscribe((data: ResponseModel | SocialUser)=>{
        this.myUser = data;
      });
      this.authSvc.authState
      .pipe(
        map((user:SocialUser|ResponseModel)=>{
          if(user instanceof SocialUser){
            return {
              ... user,
              email: 'test@test.com'
            };
          } else {
            return user;
          }
        }))
      .subscribe((user: SocialUser):void=>{
        if(user!==null){
          this.myUser = user;
        } else {
          return;
        }
      })
  }

  logOut(){
    this.userSvc.signOut()
  }

}
