import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Transaction } from '../models/transaction.interface';
import { computed, inject } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, debounceTime, tap, switchMap } from 'rxjs';
import { filterByTime } from '../utils/time-filter.utils';

interface BusinessState {
  transactions: Transaction[];
  isLoading: boolean;
  filter: {
    time: 'year' | 'quarter' | 'month' | 'week' | 'day';
    category: 'all' | number;
    sale: 'all' | boolean;
  };
}

const initialState: BusinessState = {
  transactions: [],
  isLoading: false,
  filter: { time: 'month', category: 'all', sale: 'all' },
};

export const BusinessStore = signalStore(
  withState(initialState),
  withComputed(({ transactions, filter }) => ({
    revenue: computed(() => {
      let amount = 0;
      for (const transaction of transactions()) {
        if (
          transaction.type == 'retraitVente' &&
          (filter.category() == 'all' ||
            transaction.category == filter.category()) &&
          (filter.sale() == 'all' || transaction.onSale == filter.sale()) &&
          filterByTime(transaction.date, filter.time())
        ) {
          amount += transaction.price;
        }
      }
      return amount;
    }),
    // revenueBis: computed(() => store.revenue() + 3),
  })),
  withMethods((store) => ({
    updateTimeFilter(
      time: 'year' | 'quarter' | 'month' | 'week' | 'day'
    ): void {
      patchState(store, (state) => ({
        filter: { ...state.filter, time },
      }));
    },
    updateCategoryFilter(category: number): void {
      patchState(store, (state) => ({
        filter: { ...state.filter, category },
      }));
    },
    updateSaleFilter(sale: 'all' | boolean): void {
      patchState(store, (state) => ({
        filter: { ...state.filter, sale },
      }));
    },
  })),
  withMethods((store, booksService = inject(TransactionsService)) => ({
    load: rxMethod<void>(
      pipe(
        debounceTime(300),
        // distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return booksService.getTransactions().pipe(
            tapResponse({
              next: (transactions) => {
                patchState(store, { transactions, isLoading: false });
                console.log(store.transactions());
                console.log(store.revenue());
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
