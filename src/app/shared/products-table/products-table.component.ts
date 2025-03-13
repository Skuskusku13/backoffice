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
    'comments',
    'send',
  ];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && this.products) {
      this.dataSource.data = this.products;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  sendRowUpdates(row: Product) {
    console.log('rowid:', row.tig_id);
  }
}
