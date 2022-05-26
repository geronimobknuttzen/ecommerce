import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThankComponent } from './components/thank/thank.component';
import { PresetComponent } from './components/preset/preset.component';
import { HttpClientModule } from '@angular/common/http';
import { MoviePresetComponent } from './components/movie-preset/movie-preset.component';
import { OriginalPresetComponent } from './components/original-preset/original-preset.component';
import { NaturePresetComponent } from './components/nature-preset/nature-preset.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { TrabajosComponent } from './components/trabajos/trabajos.component';
import { AutorretratosComponent } from './components/autorretratos/autorretratos.component';
import { RetratosComponent } from './components/retratos/retratos.component';

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
    MoviePresetComponent,
    OriginalPresetComponent,
    NaturePresetComponent,
    NavbarComponent,
    PortfolioComponent,
    TrabajosComponent,
    AutorretratosComponent,
    RetratosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
