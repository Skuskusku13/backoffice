import { GraphCardComponent } from '../../shared/graph-card/graph-card.component';
import {
  MatGridList,
  MatGridListModule,
  MatGridTile,
} from '@angular/material/grid-list';
import { FilterComponent } from '../../shared/filter/filter.component';
import { Component, effect, inject, OnInit } from '@angular/core';
import { BusinessStore } from '../../core/state/business.store';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { LineChartComponent } from '../../shared/line-chart/line-chart.component';
import { getActualDateGroup } from '../../core/utils/time-filter.utils';

/**
 * @title Business page component
 */
@Component({
  selector: 'app-business',
  imports: [
    SpinnerComponent,
    GraphCardComponent,
    MatGridList,
    MatGridTile,
    MatGridListModule,
    FilterComponent,
    LineChartComponent,
  ],
  providers: [BusinessStore],
  templateUrl: './business.component.html',
  styleUrl: './business.component.scss',
})
export class BusinessComponent implements OnInit {
  readonly store = inject(BusinessStore);
  actualDateGroup = getActualDateGroup(this.store.filter().time);
  metrics = [
    {
      title: "Chiffre d'affaire",
      amount: this.store.revenues().totalRevenueActual,
      havePreviousAmount: false,
    },
    {
      title: 'Résultats comptables',
      amount: this.store.marge(),
      havePreviousAmount: true,
      previousAmount: this.store.previousMarge(),
    },
    {
      title: 'Impôts',
      amount: this.store.impots(),
      havePreviousAmount: false,
    },
  ];

  periodes = [
    { value: 'year', viewValue: 'Annuel', titleForm: 'Période' },
    { value: 'quarter', viewValue: 'Trimestriel' },
    { value: 'month', viewValue: 'Mensuel' },
    { value: 'week', viewValue: 'Hebdomadaire' },
    { value: 'day', viewValue: 'Journalier' },
  ];

  categories = [
    { value: '', viewValue: 'Tous', titleForm: 'Catégories' },
    { value: '0', viewValue: 'Poissons' },
    { value: '1', viewValue: 'Fruits de mer' },
    { value: '2', viewValue: 'Crustacés' },
  ];

  typesVentes = [
    { value: 'all', viewValue: 'Tous', titleForm: 'Types de ventes' },
    { value: 'false', viewValue: 'Prix fort' },
    { value: 'true', viewValue: 'Promotions' },
  ];

  constructor() {
    effect(() => {
      this.metrics[0].amount = this.store.revenues().totalRevenueActual;
      this.metrics[1].amount = this.store.marge();
      this.metrics[1].previousAmount = this.store.previousMarge();
      this.metrics[2].amount = this.store.impots();
    });
    effect(() => {
      const filter = this.store.filter();
      this.store.loadRevenues();
      this.actualDateGroup = getActualDateGroup(this.store.filter().time);
    });
  }

  ngOnInit(): void {
    this.store.loadRevenues();
  }
}
