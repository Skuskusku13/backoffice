import { Component, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductsTableComponent } from '../../shared/products-table/products-table.component';
import { ProductsStore } from '../../core/state/products.store';
import { ProductUpdateData } from '../../core/models/product-update-dto.interface';
import { ProductsService } from '../../core/services/products.service';

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
  private productsService: ProductsService = inject(ProductsService);

  ngOnInit(): void {
    this.store.load();
  }

  handleProductUpdate(productUpdateData: ProductUpdateData): void {
    this.productsService.updateProduct(productUpdateData).subscribe({
      next: () => {
        alert('Produit modifié avec succès !');
        this.store.load();
      },
      error: (error) => {
        alert('Erreur lors de la modification du produit !' + error);
      },
    });
    console.log('recup product update:', productUpdateData);
  }

  handleProductsUpdate(productsUpdateData: ProductUpdateData[]) {
    this.productsService.updateProducts(productsUpdateData).subscribe({
      next: () => {
        alert('Produits modifiés avec succès !');
        this.store.load();
      },
      error: (error) => {
        alert('Erreur lors de la modification des produits !' + error);
      },
    });
    console.log('recup products update:', productsUpdateData);
  }
}
