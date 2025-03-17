import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { BusinessComponent } from './pages/business/business.component';
import {LoginComponent} from './pages/login/login.component';
import {AuthGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', title: 'BackOffice | Login', component: LoginComponent },
  { path: 'home', title: 'BackOffice | Home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'products', title: 'BackOffice | Products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'business', title: 'BackOffice | Business', component: BusinessComponent, canActivate: [AuthGuard] },
];
