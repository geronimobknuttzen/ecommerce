import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlbumsService } from 'src/app/services/albums.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-newup',
  templateUrl: './newup.component.html',
  styleUrls: ['./newup.component.scss']
})
export class NewupComponent implements OnInit {
  public files: any = [];
  public imageName: string;
  public albums:any[] = [];
  public selectedOption = 0;
  public preview:string;
  public fileType: any = ['.png', '.jpeg', '.jpg'];
  upload: FormGroup;

  constructor(
    private uploadSvc: UploadService,
    private sanitizer: DomSanitizer,
    private albumSvc: AlbumsService,
    private toaster: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.upload = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(4)]),
      url: new FormControl(''),
      description: new FormControl(''),
      section: new FormControl('')
    })
    this.albumSvc.getAllAlbums().subscribe((album: any)=>{
      this.albums = album.albums
    })
  }
  search(event){
    let input = event.target.closest('label').querySelector('input');
    input.click();
  }

  uploadFile(file:File){
    try{
      const dataForm:FormData = new FormData();
        let title = this.upload.value.title;
        let description = this.upload.value.description;
        let url = this.upload.value.url;
        let section = this.upload.value.section
        console.log(file[0])
        console.log(this.upload.value)
        dataForm.append('news', file[0]);
        dataForm.append('title_first', title);
        dataForm.append('title_second', url);
        dataForm.append('subtitle', description);
        dataForm.append('link', section);

      console.log(dataForm)
      this.uploadSvc.uploadNew(dataForm).subscribe(res=>{
        if(res.success == true){
          this.toaster.success(
            'Subida',
            `Imagen`,
            {
              timeOut: 1500,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-full-width',
            }
            );
            this.router.navigate([this.router.url]);
        }
      })

    }catch(e){
      console.log('Error:', e)
    }
  }
  prevFunc = async($event:any)=> new Promise((resolve, reject)=>{
    try{
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () =>{
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    } catch(e){
      return null;
    }
  })

  fileEvent(event){
    this.imageName = event.target.files[0].name;
    console.log(event.target.files[0])
    const file = event.target.files[0];
    this.prevFunc(file).then((imagen:any) =>{
      this.preview = imagen.base;
      console.log(imagen)
    })
    this.files.push(file);
    
  }

}

export interface Upload {
  name: string,
  description: string   
}
