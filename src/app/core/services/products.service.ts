import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_URL } from '../utils/constants.utils';
import { ProductUpdateData } from '../models/product-update-dto.interface';

/**
 * @title Products service to get all products from backend
 */
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<{ products: Product[] }>(API_URL + 'products/')
      .pipe(map((response) => response.products ?? []));
  }

  getProduct(tig_id: number): Observable<Product> {
    return this.http.get<Product>(API_URL + 'products/' + tig_id);
  }

  updateProducts(updatedProducts: ProductUpdateData[]): Observable<Product[]> {
    return this.http.put<Product[]>(
      API_URL + 'products/update',
      updatedProducts,
      this.httpOptions
    );
  }

  updateProduct(updatedProduct: ProductUpdateData): Observable<Product> {
    return this.http.put<Product>(
      API_URL + `products/${updatedProduct.tig_id}/update`,
      updatedProduct,
      this.httpOptions
    );
  }
}
