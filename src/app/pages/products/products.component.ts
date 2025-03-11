import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

/**
 * @title Products page component
 */
@Component({
  selector: 'app-products',
  imports: [MatTabsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  categories = [
    { id: 0, name: 'Poissons' },
    { id: 1, name: 'Crustacés' },
    { id: 2, name: 'Fruits de mer' },
  ];
}
