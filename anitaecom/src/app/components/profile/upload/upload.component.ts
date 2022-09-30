import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AlbumsService } from 'src/app/services/albums.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [UploadService]
})
export class UploadComponent implements OnInit {
  public files: any = [];
  public imageName: string;
  public albums:any[] = [];
  public preview:string;
  public fileType: any = ['.png', '.jpeg', '.jpg'];
  public upload: FormGroup;

  constructor(
    private uploadSvc: UploadService,
    private sanitizer: DomSanitizer,
    private albumSvc: AlbumsService,
    private toaster: ToastrService,
    private router: Router
    ) { }
  
  ngOnInit(): void {
    this.upload = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl(''),
      cat_id: new FormControl('', [Validators.required, Validators.minLength(4)]),
      category_name: new FormControl('')
    })
    this.albumSvc.getAllAlbums().subscribe((album: any)=>{
      this.albums = album
    })
  }

  search(event){
    let input = event.target.closest('label').querySelector('input');
    input.click();
  }

  uploadFile(file:File){
    try{
      const dataForm:FormData = new FormData();
        let name = this.upload.value.name;
        let description = this.upload.value.description;
        let cat_id = this.upload.value.cat_id;
        let category = ''
        if(cat_id == 1){
          category = "Retratos"
        }else if(cat_id == 2){
          category = "Trabajos"
        }else if(cat_id == 3){
          category = "Autorretratos"
        }
        console.log(file[0])
        console.log(this.upload.value)
        dataForm.append('image', file[0]);
        dataForm.append('name', name);
        dataForm.append('description', description);
        dataForm.append('cat_id', cat_id);
        dataForm.append('category', category);

      console.log(dataForm)
      this.uploadSvc.uploadFile(dataForm).subscribe(res=>{
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
            this.router.navigate(['/profile/', 'uploadOk']);
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
  description: string,
  category:{
    cat_id: number,
    cat_name: string
  } 
    
}