import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductsTableComponent } from '../../shared/products-table/products-table.component';
import { ProductsService } from '../../core/services/products.service';

/**
 * @title Products page component
 */
@Component({
  selector: 'app-products',
  imports: [MatTabsModule, ProductsTableComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  categories = [
    { id: 0, name: 'Poissons' },
    { id: 1, name: 'Crustacés' },
    { id: 2, name: 'Fruits de mer' },
  ];
  private productsService: ProductsService = inject(ProductsService);
}
