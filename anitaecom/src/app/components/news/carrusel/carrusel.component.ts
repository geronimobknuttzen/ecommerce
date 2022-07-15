import { ICarrouselItem } from '../../../models/icarrusel-items.metadata';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss']
})
export class CarruselComponent implements OnInit {
  // Custom Properties
  @Input() height = 500;
  @Input() isFullScreen = false;
  @Input() images: ICarrouselItem[] = [];

  // Final Properties
  public finalHeight: string | number = 0;
  public currentPosition = 0;

  constructor(
    private newsSvc: NewsService,
    private zone: NgZone,) { 
    this.finalHeight = this.isFullScreen ? '100vh' : `${this.height}px`
  }

  ngOnInit(): void {
    this.images.map((i, index)=>{
      i.id = index;
      i.marginLeft = 0;
    })
    this.newsSvc.getNews().subscribe((news: any)=>{
      this.images = news.images
      console.log(news.images)
    })
  }

  setCurrentPosition(position: number){
    this.currentPosition = position;
    this.images.find(i=>i.id==1).marginLeft = -100 * (position-1);
  }

  setNextPosition(){
    let finalPercentage = 0;
    let nextPosition = this.currentPosition + 1;

    if(nextPosition <= this.images.length-1){
      finalPercentage = -100 * nextPosition;
    } else {
      nextPosition = 0;
    }
    this.images.find(i=>i.id).marginLeft = finalPercentage;
    this.currentPosition = nextPosition;
  }

  setBackPosition(){
    let finalPercentage = 0;
    let backPosition = this.currentPosition - 1;
    if(backPosition>=0){
      finalPercentage = -100 * backPosition
    }else{
      backPosition = this.images.length -1;
      finalPercentage = -100 * backPosition;
    }
    this.images.find(i=>i.id).marginLeft = finalPercentage;
    this.currentPosition = backPosition
  }
}
