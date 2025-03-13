import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
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
    'discount',
    'quantityInStock',
    'number_sold',
    'updateDiscount',
    'updateStock',
    'comments',
    'send',
  ];
  public form!: FormGroup;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder) {}

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
            discount: [product.discount],
            stock: [product.quantityInStock],
          })
        )
      ),
    });
  }

  get productsArray(): FormArray {
    return this.form.get('productsArray') as FormArray;
  }

  sendRowUpdates(row: Product) {
    console.log('rowid:', row.tig_id);
  }

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

  onSubmit(index: number) {
    const updatedProduct = this.productsArray.at(index).value;
    console.log('Produit mis à jour :', updatedProduct);
    // service
  }

  onSubmitAllUpdates() {
    console.log('Toutes les mises à jour :', this.productsArray.value);
  }
}
