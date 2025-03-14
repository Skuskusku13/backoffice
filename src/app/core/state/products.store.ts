import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from '../models/product.interface';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { ProductsService } from '../services/products.service';
import { pipe, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs';

type ProductsState = {
  products: Product[];
  isLoading: boolean;
  category: number;
};

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  category: 0,
};

/**
 * @title Store for dealing with products state
 */
export const ProductsStore = signalStore(
  withState(initialState),
  withComputed(({ products, category }) => ({
    productsCount: computed(() => {
      return products().length;
    }),
    sortedProducts: computed(() => {
      return products().filter((product) => {
        return product.category == category();
      });
    }),
  })),
  withMethods((store, productsService = inject(ProductsService)) => ({
    updateCategory(category: number): void {
      patchState(store, () => ({
        category: category,
      }));
    },
    load: rxMethod<void>(
      pipe(
        debounceTime(300),
        // distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return productsService.getProducts().pipe(
            tapResponse({
              next: (products) => {
                patchState(store, { products, isLoading: false });
              },
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            })
          );
        })
      )
    ),
  }))
);
