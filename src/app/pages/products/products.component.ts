import { Component, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductsTableComponent } from '../../shared/products-table/products-table.component';
import { ProductsStore } from '../../core/state/products.store';
import { ProductUpdateData } from '../../core/models/product-update-dto.interface';
import { ProductsService } from '../../core/services/products.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

/**
 * @title Products page component
 */
@Component({
  selector: 'app-products',
  imports: [
    MatTabsModule,
    ProductsTableComponent,
    SpinnerComponent,
    MatSnackBarModule,
  ],
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

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.store.load();
  }

  handleProductUpdate(productUpdateData: ProductUpdateData): void {
    this.productsService.updateProduct(productUpdateData).subscribe({
      next: () => {
        // alert('Produit modifié avec succès !');
        this.openSnackBar('info');
        this.store.load();
      },
      error: (error) => {
        // alert('Erreur lors de la modification du produit !' + error);
        console.log(error);
        this.openSnackBar('error');
      },
    });
  }

  handleProductsUpdate(productsUpdateData: ProductUpdateData[]) {
    this.productsService.updateProducts(productsUpdateData).subscribe({
      next: () => {
        // alert('Produits modifiés avec succès !');
        this.openSnackBar('info');
        this.store.load();
      },
      error: (error) => {
        // alert('Erreur lors de la modification des produits !' + error);
        console.log(error);
        this.openSnackBar('error');
      },
    });
  }

  openSnackBar(type: 'info' | 'error'): void {
    const text =
      type === 'info'
        ? 'Produit modifié avec succès !'
        : 'Erreur lors de la modification du produit !';
    const panelClass = type === 'info' ? 'info-snackbar' : 'error-snackbar';
    this.snackBar.open(text, 'Fermer', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [panelClass],
    });
  }
}
