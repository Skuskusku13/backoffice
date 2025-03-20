import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AmountByPeriod } from '../../core/models/revenue-dto.interface';
import { DateGroupLabelPipe } from '../../core/pipes/date-group-label.pipe';

@Component({
  selector: 'app-line-chart',
  imports: [BaseChartDirective],
  providers: [DateGroupLabelPipe],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent implements OnInit {
  barChartData!: ChartData<'line'>;
  barChartOptions!: ChartOptions<'line'>;
  @Input() revenuesByPeriod: AmountByPeriod[] = [];

  constructor(private dateGroupLabelPipe: DateGroupLabelPipe) {}

  ngOnInit(): void {
    console.log(this.revenuesByPeriod);
    this.barChartData = {
      labels: this.revenuesByPeriod.map((revenue) =>
        this.dateGroupLabelPipe.transform(revenue.date_group)
      ),
      datasets: [
        {
          label: "Chiffre d'affaire",
          data: this.revenuesByPeriod.map((revenue) => revenue.total),
          borderColor: '#3e8bff',
          backgroundColor: 'rgba(0, 0, 255, 0.3)',
          tension: 0,
        },
      ],
    };
    this.barChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#333',
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: '#333',
          },
          title: {
            display: true,
            text: "Chiffre d'affaires (€)",
            color: '#555',
          },
        },
      },
    };
  }
}
