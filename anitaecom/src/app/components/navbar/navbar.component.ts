import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  menuVariable:boolean = true;
  menuIconVariable:boolean = false;

  openMenu(){
    this.menuVariable =! this.menuVariable;
    this.menuIconVariable =! this.menuIconVariable 
  }

}
