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
import { RevenuesDto } from '../models/revenue-dto.interface';

interface BusinessState {
  revenues: RevenuesDto;
  isLoading: boolean;
  filter: {
    time: 'year' | 'quarter' | 'month' | 'week' | 'day';
    category: string;
    sale: 'all' | 'true' | 'false';
  };
}

const initialState: BusinessState = {
  revenues: {
    totalRevenueActual: 0,
    totalRevenue: 0,
    revenuesByPeriod: [],
  },
  isLoading: false,
  filter: { time: 'year', category: '', sale: 'all' },
};

export const BusinessStore = signalStore(
  withState(initialState),
  // withComputed(({ transactions, filter }) => ({
  //   revenue: computed(() => {
  //     let amount = 0;
  //     for (const transaction of transactions()) {
  //       if (
  //         transaction.type == 'retraitVente' &&
  //         (filter.category() == 'all' ||
  //           transaction.category == filter.category()) &&
  //         (filter.sale() === 'all' ||
  //           transaction.onSale === (filter.sale() === 'true')) &&
  //         filterByTime(transaction.date, filter.time())
  //       ) {
  //         amount += transaction.price;
  //       }
  //     }
  //     return amount;
  //   }),
  //   // revenueBis: computed(() => store.revenue() + 3),
  // })),
  withMethods((store, transactionsService = inject(TransactionsService)) => ({
    updateTimeFilter(
      time: 'year' | 'quarter' | 'month' | 'week' | 'day'
    ): void {
      patchState(store, (state) => ({
        filter: { ...state.filter, time },
      }));
    },
    updateCategoryFilter(category: string): void {
      patchState(store, (state) => ({
        filter: { ...state.filter, category },
      }));
    },
    updateSaleFilter(sale: 'all' | 'true' | 'false'): void {
      patchState(store, (state) => ({
        filter: { ...state.filter, sale },
      }));
    },
    loadRevenues: rxMethod<void>(
      pipe(
        debounceTime(300),
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return transactionsService
            .getRevenuesByFilters(
              store.filter().time,
              store.filter().category,
              store.filter().sale
            )
            .pipe(
              tapResponse({
                next: (revenues) => {
                  patchState(store, { revenues, isLoading: false });
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
