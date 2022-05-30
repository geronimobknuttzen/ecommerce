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

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'preset', component: PresetComponent},
  {path:'preset/:id', component: PresetComponent},
  {path:'portfolio', component: PortfolioComponent},
  {path: 'trabajos', component: TrabajosComponent},
  {path: 'autorretratos', component: AutorretratosComponent},
  {path: 'retratos', component: RetratosComponent},
  {path:'cart', component: CartComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'terminarCompra', component: TerminarComponent},
  {path:'gracias', component: ThankComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
