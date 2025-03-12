import { Component, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductsTableComponent } from '../../shared/products-table/products-table.component';
import { ProductsStore } from '../../core/state/products.store';

/**
 * @title Products page component
 */
@Component({
  selector: 'app-products',
  imports: [MatTabsModule, MatProgressSpinnerModule, ProductsTableComponent],
  providers: [ProductsStore],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  categories = [
    { id: 0, name: 'Poissons' },
    { id: 1, name: 'Fruits de mer' },
    { id: 2, name: 'Crustacés' },
  ];
  readonly store = inject(ProductsStore);

  ngOnInit(): void {
    this.store.load();
  }
}
