import { Component, Input } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitleGroup,
} from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-graph-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitleGroup,
    MatCardContent,
    MatCardModule,
    CurrencyPipe,
  ],
  standalone: true,
  templateUrl: './graph-card.component.html',
  styleUrl: './graph-card.component.scss',
})
export class GraphCardComponent {
  @Input() titleGraph = '';
  @Input() sales = 0;
}
