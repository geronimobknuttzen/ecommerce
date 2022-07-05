import { UploadComponent } from './components/profile/upload/upload.component';
import { ProfileGuard } from './guard/profile.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

//componentes
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { PresetComponent } from './components/preset/preset.component';
import { ThankComponent } from './components/thank/thank.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { TrabajosComponent } from './components/trabajos/trabajos.component';
import { AutorretratosComponent } from './components/autorretratos/autorretratos.component';
import { RetratosComponent } from './components/retratos/retratos.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { MovieComponent } from './components/preset/movie/movie.component';
import { OriginalComponent } from './components/preset/original/original.component';
import { NatureComponent } from './components/preset/nature/nature.component';
import { NewsComponent } from './components/news/news.component';
import { AlbumComponent } from './components/profile/album/album.component';
import { NewupComponent } from './components/profile/newup/newup.component';
import { EditnewComponent } from './components/profile/editnew/editnew.component';
import { AutorretratoseditComponent } from './components/profile/album/autorretratos/autorretratos.component';
import { RetratoseditComponent } from './components/profile/album/retratos/retratos.component';
import { TrabajoseditComponent } from './components/profile/album/trabajos/trabajos.component';
import { UploadokComponent } from './components/profile/uploadok/uploadok.component';
import { DeleteokComponent } from './components/profile/deleteok/deleteok.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent }, 
  { path:'preset', component: PresetComponent},
  { path: 'preset/movie', component: MovieComponent },
  { path: 'preset/original', component: OriginalComponent },
  { path: 'preset/nature', component: NatureComponent}, 
  {path:'portfolio', component: PortfolioComponent},
  {path: 'portfolio/trabajos', component: TrabajosComponent},
  {path: 'portfolio/autorretratos', component: AutorretratosComponent},
  {path: 'portfolio/retratos', component: RetratosComponent},
  {path:'cart', component: CartComponent},
  {path:'gracias', component: ThankComponent},
  {path:'login', component: LoginComponent},
  {path:'profile', component: ProfileComponent, canActivate:[ProfileGuard],
  children:[
    { path:'editAlbum/autorretratos', component: AutorretratoseditComponent, data:{ id:'album', title: 'Album'}},
    { path:'editAlbum/retratos', component: RetratoseditComponent, data:{ id:'album', title: 'Album'}},
    { path:'editAlbum/trabajos', component: TrabajoseditComponent, data:{ id:'album', title: 'Album'}},
    { path:'uploadImg', component: UploadComponent, data:{ id:'upload', title: 'Upload'}},
    { path:'editAlbum', component: AlbumComponent, data:{ id:'album', title: 'Album'}},
    { path:'uploadNew', component: NewupComponent, data:{ id:'newup', title: 'UploadNew'}},
    { path:'editNew', component: EditnewComponent, data:{ id:'new', title: 'New'}},
    { path:'uploadOk', component: UploadokComponent, data:{ id:'ok', title: 'Upload ok'}},
    { path:'deleteOk', component: DeleteokComponent, data:{ id:'ok', title: 'Delete ok'}}
  ]},
  {path:'gracias', component: ThankComponent},
  {path:'news', component: NewsComponent},
  { path: '**', component: Page404Component},


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{
      initialNavigation: "enabled",
      anchorScrolling: "enabled",
      scrollPositionRestoration: 'top',
      onSameUrlNavigation: 'reload',
      paramsInheritanceStrategy: 'always',
      useHash: true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
