import { Component, Input } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Product } from '../../core/models/product.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-products-table',
  imports: [MatTableModule, MatPaginatorModule, JsonPipe],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss',
})
export class ProductsTableComponent {
  @Input() public products!: Product[];
}
