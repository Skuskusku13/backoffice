import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product } from '../../core/models/product.interface';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductUpdateData } from '../../core/models/product-update-dto.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

/**
 * @title Products table with pagination
 */
@Component({
  selector: 'app-products-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CurrencyPipe,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss',
})
export class ProductsTableComponent implements AfterViewInit, OnChanges {
  @Input() public products!: Product[];
  public dataSource = new MatTableDataSource<Product>();
  public displayedColumns: string[] = [
    'name',
    'price',
    'discount_price',
    // 'discount',
    'updateDiscount',
    'quantityInStock',
    'updateStock',
    'number_sold',
    'comments',
    'send',
  ];
  public form!: FormGroup;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public productUpdate = output<ProductUpdateData>();
  public productsUpdate = output<ProductUpdateData[]>();

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && this.products) {
      this.dataSource.data = this.products;
      this.initForm();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initForm(): void {
    this.form = this.fb.group({
      productsArray: this.fb.array(
        this.products.map((product) =>
          this.fb.group({
            tig_id: [product.tig_id],
            discount: [product.discount],
            quantityInStock: [0],
            purchasePrice: [0],
          })
        )
      ),
    });
  }

  get productsArray(): FormArray {
    return this.form.get('productsArray') as FormArray;
  }

  // s'active au clic sur une ligne
  // sendRowUpdates(row: Product): void {
  //   console.log('clickOnProduct:', row);
  // }

  isModified(index: number): boolean {
    const productGroup = this.productsArray.at(index) as FormGroup;
    return productGroup.dirty && productGroup.valid;
  }

  isAtLeastTwoRowsModified(): boolean {
    const modifiedRows = this.form.value.productsArray.filter(
      (product: any) => product.discount !== 0 || product.stock !== 0
    );
    return modifiedRows.length >= 2;
  }

  onSubmit(index: number): void {
    const productUpdateData: ProductUpdateData = this.productsArray.at(index).value;
    this.updateProductData(productUpdateData);
    this.productUpdate.emit(productUpdateData);
    this._snackBar.open('Mise à jour effectuée avec succès ✓', 'Fermer', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],
    });
  }

  onSubmitAllUpdates(): void {
    const productsUpdateData: ProductUpdateData[] = this.productsArray.value;
    
    // Vérifier s'il y a des modifications
    const hasModifications = productsUpdateData.some(
      product => product.discount !== 0 || product.quantityInStock !== 0
    );

    if (!hasModifications) {
      this._snackBar.open('Aucune modification n\'a été effectuée ⚠️', 'Fermer', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar'],
      });
      return;
    }

    // Si des modifications existent, continuer avec la mise à jour
    for (const productUpdateData of productsUpdateData) {
      this.updateProductData(productUpdateData);
    }
    this.productsUpdate.emit(productsUpdateData);
    this._snackBar.open('Toutes les mises à jour ont été effectuées ✓', 'Fermer', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],
    });
  }

  updateProductData(productUpdateData: ProductUpdateData): ProductUpdateData {
    const product = this.products.find(
      (product) => product.tig_id === productUpdateData.tig_id
    );
    if (product) {
      productUpdateData.quantityInStock += product.quantityInStock;
    }
    productUpdateData.sale = productUpdateData.discount !== 0;
    return productUpdateData;
  }
}
