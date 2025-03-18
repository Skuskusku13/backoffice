import { GraphCardComponent } from '../../shared/graph-card/graph-card.component';
import {
  MatGridList,
  MatGridListModule,
  MatGridTile,
} from '@angular/material/grid-list';
import { FilterComponent } from '../../shared/filter/filter.component';
import {
  Component,
  effect,
  inject,
  OnInit,
} from '@angular/core';
import { BusinessStore } from '../../core/state/business.store';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

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
  ],
  providers: [BusinessStore],
  templateUrl: './business.component.html',
  styleUrl: './business.component.scss',
  // encapsulation: ViewEncapsulation.None
})
export class BusinessComponent implements OnInit {
  readonly store = inject(BusinessStore);
  data: any = [
    {
      title: "Chiffre d'affaire",
      sales: this.store.revenue(),
      valuePercent: 0,
    },
    {
      title: 'Résultat comptable',
      sales: 14,
      valuePercent: 0,
    },
    {
      title: 'Impôt',
      sales: 6,
      valuePercent: 0,
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
    { value: 'all', viewValue: 'Tous', titleForm: 'Catégories' },
    { value: '0', viewValue: 'Poissons' },
    { value: '1', viewValue: 'Fruits De Mer' },
    { value: '2', viewValue: 'Crustacés' },
  ];

  typesVentes = [
    { value: 'all', viewValue: 'Tous', titleForm: 'Types de ventes' },
    { value: 'false', viewValue: 'Achats' },
    { value: 'true', viewValue: 'Promotions' },
  ];

  constructor() {
    effect(() => {
      this.data[0].sales = this.store.revenue();
    });
  }

  ngOnInit(): void {
    this.store.load();
  }
}
