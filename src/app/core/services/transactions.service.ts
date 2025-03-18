import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_URL } from '../utils/constants.utils';
import { Transaction } from '../models/transaction.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<Transaction[]> {
    return this.http
      .get<{ transactions: Transaction[] }>(API_URL + 'transactions/')
      .pipe(
        map((response) =>
          (response.transactions ?? []).map((transaction) => ({
            ...transaction,
            date: new Date(transaction.date),
          }))
        )
      );
  }
}
