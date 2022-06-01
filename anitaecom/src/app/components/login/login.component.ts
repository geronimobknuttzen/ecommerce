import { UserService } from './../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
email: string;
password: string;

  constructor(
    private authSvc: SocialAuthService,
    private router: Router,
    private userSvc: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userSvc.authStatus$.subscribe(authState=>{
      if(authState){
        this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'] || '/profile')
      } else {
        this.router.navigateByUrl('/login')
      }
    })
  }
  login(form: NgForm){
    const email: string = this.email;
    const password: string = this.password;

    if(form.invalid){
      return;
    }

    form.reset();

    this.userSvc.loginUser(email, password);
  }
  signInWithGoogle(){
    this.userSvc.signInWithGoogle();
  }
  signInWithFacebook(){

  }

}
