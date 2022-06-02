import { ProfileGuard } from './guard/profile.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//componentes
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { PresetComponent } from './components/preset/preset.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThankComponent } from './components/thank/thank.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { TrabajosComponent } from './components/trabajos/trabajos.component';
import { AutorretratosComponent } from './components/autorretratos/autorretratos.component';
import { RetratosComponent } from './components/retratos/retratos.component';
import { TerminarComponent } from './components/terminar/terminar.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { MovieComponent } from './components/preset/movie/movie.component';
import { AcantiladoComponent } from './components/preset/movie/acantilado/acantilado.component';
import { DesertComponent } from './components/preset/movie/desert/desert.component';
import { HollywoodComponent } from './components/preset/movie/hollywood/hollywood.component';
import { MargaritasComponent } from './components/preset/movie/margaritas/margaritas.component';
import { VerdeaguaComponent } from './components/preset/movie/verdeagua/verdeagua.component';
import { NubesComponent } from './components/preset/movie/nubes/nubes.component';
import { RutaComponent } from './components/preset/movie/ruta/ruta.component';
import { AtardecerComponent } from './components/preset/original/atardecer/atardecer.component';
import { BajandountonoComponent } from './components/preset/original/bajandountono/bajandountono.component';
import { DetalleComponent } from './components/preset/original/detalle/detalle.component';
import { FelizComponent } from './components/preset/original/feliz/feliz.component';
import { LavadoComponent } from './components/preset/original/lavado/lavado.component';
import { OriginalComponent } from './components/preset/original/original.component';
import { BlancoynaranjaComponent } from './components/preset/original/blancoynaranja/blancoynaranja.component';
import { NevandoComponent } from './components/preset/original/nevando/nevando.component';
import { NocheComponent } from './components/preset/original/noche/noche.component';
import { OtonioComponent } from './components/preset/original/otonio/otonio.component';
import { SuaveComponent } from './components/preset/original/suave/suave.component';
import { VeranoComponent } from './components/preset/original/verano/verano.component';
import { YinyangComponent } from './components/preset/original/yinyang/yinyang.component';
import { ArenaComponent } from './components/preset/nature/arena/arena.component';
import { AvionComponent } from './components/preset/nature/avion/avion.component';
import { HotelComponent } from './components/preset/nature/hotel/hotel.component';
import { JunglaComponent } from './components/preset/nature/jungla/jungla.component';
import { MoodyComponent } from './components/preset/nature/moody/moody.component';
import { MountainComponent } from './components/preset/nature/mountain/mountain.component';
import { NatureComponent } from './components/preset/nature/nature.component';
import { PiletaComponent } from './components/preset/nature/pileta/pileta.component';
import { NewsComponent } from './components/news/news.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent }, 
  { path:'preset', component: PresetComponent},
  { path: 'preset/movie', component: MovieComponent,
    data:{
      id: 'movie/acantilado',
      title: 'moviePack'
    },
    children:[
      { path: 'acantilado',  component: AcantiladoComponent,  data: { id: 'acantilado',    title: 'Acantilado' }},
      { path: 'desert', component: DesertComponent, data:{ id:'desert', title: 'Desert' }},
      { path: 'nubes', component: NubesComponent, data:{ id:'nubes', title: 'En las Nubes' }},
      { path: 'ruta', component: RutaComponent, data:{ id:'ruta', title: 'En ruta' }},
      { path: 'hollywood', component: HollywoodComponent, data:{ id:'hollywood', title: 'Hollywood' }},    
      { path: 'margaritas', component: MargaritasComponent, data:{ id:'margaritas', title: 'Margaritas' }},    
      { path: 'verdeagua', component: VerdeaguaComponent, data:{ id:'verdeagua', title: 'Verde Agua' }},    
    ]
  },
  { path: 'preset/original', component: OriginalComponent, 
  data:{
    id: 'original/atardecer',
    title: 'original'
  },
  children:[
    { path: 'atardecer',  component: AtardecerComponent,  data: {    id: 'atardecer',    title: 'Atardecer'  }},
    { path: 'bajando', component: BajandountonoComponent, data:{ id:'bajandountono', title: 'Bajando Un Tono' }},
    { path: 'blancoynaranja', component: BlancoynaranjaComponent, data:{ id:'blanconaranja', title: 'Blanco y Naranja' }},
    { path: 'detalle', component: DetalleComponent, data:{ id:'detalle', title: 'Detalle' }},
    { path: 'nevando', component: NevandoComponent, data:{ id:'estanevando', title: 'Está Nevando' }},    
    { path: 'feliz', component: FelizComponent, data:{ id:'feliz', title: 'Efecto Feliz' }},    
    { path: 'lavado', component: LavadoComponent, data:{ id:'lavado', title: 'Lavado' }},    
    { path: 'noche', component: NocheComponent, data:{ id:'noche', title: 'Noche' }},    
    { path: 'otonio', component: OtonioComponent, data:{ id:'otonio', title: 'Es Otoño' }},    
    { path: 'suave', component: SuaveComponent, data:{ id:'suave', title: 'Bien suave' }},    
    { path: 'verano', component: VeranoComponent, data:{ id:'verano', title: 'Llego el Verano' }},    
    { path: 'yinyang', component: YinyangComponent, data:{id:'yinyang', title: 'Yin Yang'}}]},
    { path: 'preset/nature', component: NatureComponent,
    data:{
      id: 'nature/mountain',
      title: 'nature'
    },
    children:[
      { path: 'mountain',  component: MountainComponent,  data: {    id: 'mountain',    title: 'Mountain'}},
      { path: 'avion', component: AvionComponent, data:{ id:'avion', title: 'Avion'}},
      { path: 'jungla', component: JunglaComponent, data:{ id:'jungla', title: 'Jungla'}},
      { path: 'pileta', component: PiletaComponent, data:{ id:'pileta', title: 'Pileta'}},
      { path: 'arena', component: ArenaComponent, data:{ id:'arena', title: 'Arena'}},  
      { path: 'hotel', component: HotelComponent, data:{ id:'hotel', title: 'Hotel'}},   
      { path: 'moody', component: MoodyComponent, data:{ id:'moody', title: 'Moody'}}   
    ] }, 
  {path:'portfolio', component: PortfolioComponent},
  {path: 'trabajos', component: TrabajosComponent},
  {path: 'autorretratos', component: AutorretratosComponent},
  {path: 'retratos', component: RetratosComponent},
  {path:'cart', component: CartComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'terminarCompra', component: TerminarComponent},
  {path:'gracias', component: ThankComponent},
  {path:'login', component: LoginComponent},
  {path:'profile', component: ProfileComponent, canActivate:[ProfileGuard]},
  {path:'gracias', component: ThankComponent},
  {path:'news', component: NewsComponent},
  { path: '**', component: Page404Component},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
