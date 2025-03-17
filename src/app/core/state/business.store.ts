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

type BusinessState = {
  transactions: Transaction[];
  isLoading: boolean;
  filter: {
    time: 'year' | 'quarter' | 'month' | 'week' | 'day';
    category: number;
    sale: 'all' | boolean;
  };
};

const initialState: BusinessState = {
  transactions: [],
  isLoading: false,
  filter: { time: 'month', category: -1, sale: 'all' },
};

export const BusinessStore = signalStore(
  withState(initialState),
  withComputed(({ transactions, filter: revenueFilter }) => ({
    revenue: computed(() => {
      const today = new Date();
      let amount = 0;
      for (let transaction of transactions()) {
        if (
          transaction.type === 'retraitVente' &&
          transaction.category === revenueFilter().category &&
          (revenueFilter().sale === 'all' ||
            transaction.onSale === revenueFilter().sale)
        ) {
          switch (revenueFilter().time) {
            case 'year': {
              if (transaction.date.getFullYear() === today.getFullYear()) {
                amount += transaction.price;
              }
              break;
            }
            case 'quarter': {
              const currentQuarter = Math.floor(today.getMonth() / 3);
              const transactionQuarter = Math.floor(
                transaction.date.getMonth() / 3
              );
              if (
                transaction.date.getFullYear() === today.getFullYear() &&
                transactionQuarter === currentQuarter
              ) {
                amount += transaction.price;
              }
              break;
            }
            case 'month': {
              if (
                transaction.date.getFullYear() === today.getFullYear() &&
                transaction.date.getMonth() === today.getMonth()
              ) {
                amount += transaction.price;
              }
              break;
            }
            case 'week': {
              const startOfWeek = new Date(today);
              startOfWeek.setDate(today.getDate() - today.getDay());
              const endOfWeek = new Date(startOfWeek);
              endOfWeek.setDate(startOfWeek.getDate() + 6);
              if (
                transaction.date >= startOfWeek &&
                transaction.date <= endOfWeek
              ) {
                amount += transaction.price;
              }
              break;
            }
            case 'day': {
              if (
                transaction.date.getFullYear() === today.getFullYear() &&
                transaction.date.getMonth() === today.getMonth() &&
                transaction.date.getDate() === today.getDate()
              ) {
                amount += transaction.price;
              }
              break;
            }
          }
        }
      }
      return amount;
    }),
    // revenueBis: computed(() => revenue()+3),
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
