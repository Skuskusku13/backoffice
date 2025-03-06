import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { BusinessComponent } from './pages/business/business.component';

export const routes: Routes = [
  { path: 'home', title: 'BackOffice | Home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'products', title: 'BackOffice | Products', component: ProductsComponent },
  { path: 'business', title: 'BackOffice | Business', component: BusinessComponent },
];
