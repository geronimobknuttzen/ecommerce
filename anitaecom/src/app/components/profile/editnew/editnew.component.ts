import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-editnew',
  templateUrl: './editnew.component.html',
  styleUrls: ['./editnew.component.scss']
})
export class EditnewComponent implements OnInit {
  news:any[] = [];

  constructor(
    private newsSvc: NewsService
    ) { }

  ngOnInit(): void {
    this.newsSvc.getNews().subscribe((novedad: any)=>{
      this.news = novedad.images
    })
  }
  delete(id){
    console.log(id)
    this.newsSvc.deleteNew(id).subscribe((img: any)=>{
      console.log(img.success)
      window.location.reload()
    })
  }

}
