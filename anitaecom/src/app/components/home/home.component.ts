import { Instafeed } from './../../models/instafeed';
import { InstagramService } from './../../services/instagram.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data:Instafeed[] = []
  instaResponse: any [] = []
  constructor( private instaSvc: InstagramService) { }
  
  ngOnInit(): void {
    this.instaSvc.getInstagram().subscribe((insta: any)=>{
      this.data = insta.data
      this.instaResponse = this.data
    });
  }



}
