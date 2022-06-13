import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThankComponent } from './components/thank/thank.component';
import { PresetComponent } from './components/preset/preset.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { TrabajosComponent } from './components/trabajos/trabajos.component';
import { AutorretratosComponent } from './components/autorretratos/autorretratos.component';
import { RetratosComponent } from './components/retratos/retratos.component';
import { ToastrModule } from 'ngx-toastr';
import { TerminarComponent } from './components/terminar/terminar.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MovieComponent } from './components/preset/movie/movie.component';
import { OriginalComponent } from './components/preset/original/original.component';
import { NatureComponent } from './components/preset/nature/nature.component';
import { Page404Component } from './components/page404/page404.component';
import { AcantiladoComponent } from './components/preset/movie/acantilado/acantilado.component';
import { DesertComponent } from './components/preset/movie/desert/desert.component';
import { NubesComponent } from './components/preset/movie/nubes/nubes.component';
import { RutaComponent } from './components/preset/movie/ruta/ruta.component';
import { HollywoodComponent } from './components/preset/movie/hollywood/hollywood.component';
import { MargaritasComponent } from './components/preset/movie/margaritas/margaritas.component';
import { VerdeaguaComponent } from './components/preset/movie/verdeagua/verdeagua.component';
import { AtardecerComponent } from './components/preset/original/atardecer/atardecer.component';
import { BajandountonoComponent } from './components/preset/original/bajandountono/bajandountono.component';
import { BlancoynaranjaComponent } from './components/preset/original/blancoynaranja/blancoynaranja.component';
import { DetalleComponent } from './components/preset/original/detalle/detalle.component';
import { NevandoComponent } from './components/preset/original/nevando/nevando.component';
import { FelizComponent } from './components/preset/original/feliz/feliz.component';
import { LavadoComponent } from './components/preset/original/lavado/lavado.component';
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
import { PiletaComponent } from './components/preset/nature/pileta/pileta.component';
import { NewsComponent } from './components/news/news.component';
import { CarruselComponent } from './components/news/carrusel/carrusel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CartComponent,
    CheckoutComponent,
    ThankComponent,
    PresetComponent,
    NavbarComponent,
    PortfolioComponent,
    TrabajosComponent,
    AutorretratosComponent,
    RetratosComponent,
    TerminarComponent,
    LoginComponent,
    ProfileComponent,
    MovieComponent,
    OriginalComponent,
    NatureComponent,
    Page404Component,
    AcantiladoComponent,
    DesertComponent,
    NubesComponent,
    RutaComponent,
    HollywoodComponent,
    MargaritasComponent,
    VerdeaguaComponent,
    AtardecerComponent,
    BajandountonoComponent,
    BlancoynaranjaComponent,
    DetalleComponent,
    NevandoComponent,
    FelizComponent,
    LavadoComponent,
    NocheComponent,
    OtonioComponent,
    SuaveComponent,
    VeranoComponent,
    YinyangComponent,
    ArenaComponent,
    AvionComponent,
    HotelComponent,
    JunglaComponent,
    MoodyComponent,
    MountainComponent,
    PiletaComponent,
    NewsComponent,
    CarruselComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    FormsModule,
    SocialLoginModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxPayPalModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '503195582476-bf0d1mlqdus0hvtrjkn5q8tevjh538r1.apps.googleusercontent.com'
            )
          },
          // {
          //   id: FacebookLoginProvider.PROVIDER_ID,
          //   provider: new FacebookLoginProvider('clientId')
          // }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
