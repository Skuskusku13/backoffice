import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { API_URL } from '../utils/constants.utils';

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
    return this.http.get<Product[]>(API_URL + 'products');
  }

  getProduct(tig_id: number): Observable<Product> {
    return this.http.get<Product>(API_URL + 'products/' + tig_id);
  }

  updateProducts(): Subscription {
    return this.http
      .put(API_URL + 'products/update', {}, this.httpOptions)
      .subscribe({
        next: () => {
          alert('Produits modifiés avec succès !');
        },
        error: (error) => {
          alert('Erreur lors de la modification des produits !' + error);
        },
      });
  }

  updateProduct(tig_id: number): Subscription {
    return this.http
      .put(API_URL + `products/${tig_id}/update`, {}, this.httpOptions)
      .subscribe({
        next: () => {
          alert('Produit modifié avec succès !');
        },
        error: (error) => {
          alert('Erreur lors de la modification du produit !' + error);
        },
      });
  }
}
