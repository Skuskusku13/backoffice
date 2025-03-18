import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  imports: [BaseChartDirective],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent implements OnInit {
  barChartData!: ChartData<'line'>;
  barChartOptions!: ChartOptions<'line'>;

  ngOnInit(): void {
    this.barChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Sample Data',
          data: [10, 20, 30, 40, 50, 60, 70],
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.3)',
          tension: 0.4,
        },
      ],
    };
    this.barChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
    };
  }
}
