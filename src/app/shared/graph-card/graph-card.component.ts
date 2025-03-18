import {Component, Input, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule, MatCardTitleGroup} from '@angular/material/card';
import {CurrencyPipe, PercentPipe, TitleCasePipe} from '@angular/common';

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
  styleUrl: './graph-card.component.scss'
})
export class GraphCardComponent implements OnInit {
  @Input() titleGraph: string = ''
  @Input() sales: number = 0

  ngOnInit(): void {
    console.log('init graph component')
  }

}
