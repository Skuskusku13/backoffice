import {Component, OnInit} from '@angular/core';
import {GraphCardComponent} from '../../shared/graph-card/graph-card.component';
import {MatGridList, MatGridListModule, MatGridTile} from '@angular/material/grid-list';
import {FilterComponent} from '../../shared/filter/filter.component';

/**
 * @title Business page component
 */
@Component({
  selector: 'app-business',
  imports: [
    GraphCardComponent,
    MatGridList,
    MatGridTile,
    MatGridListModule,
    FilterComponent
  ],
  templateUrl: './business.component.html',
  styleUrl: './business.component.scss',
})
export class BusinessComponent implements OnInit {

  data: any = [
    {
      title: "Chiffre d'affaire",
      sales: 20,
      valuePercent: 0
    }, {
      title: "Résultat comptable",
      sales: 14,
      valuePercent: 0
    }, {
      title: "Impôt",
      sales: 6,
      valuePercent: 0
    },
  ]

  filters = [
    {value: 'year', viewValue: 'Annuel', titleForm: 'Période'},
    {value: 'quarter', viewValue: 'Trimestriel'},
    {value: 'month', viewValue: 'Mensuel'},
    {value: 'week', viewValue: 'Hebdomadaire'},
    {value: 'day', viewValue: 'Journalier'},
  ];

  categories = [
    {value: 'all', viewValue: 'Tous', titleForm: 'Catégories'},
    {value: '0', viewValue: 'Poissons'},
    {value: '1', viewValue: 'Fruits De Mer'},
    {value: '2', viewValue: 'Crustacés'},
  ];

  typeVentes = [
    {value: 'all', viewValue: 'Tous', titleForm: 'Types de ventes'},
    {value: 'false', viewValue: 'Achats'},
    {value: 'true', viewValue: 'Promotions'},
  ];

  ngOnInit(): void {
    console.log(this.data)
  }

}
