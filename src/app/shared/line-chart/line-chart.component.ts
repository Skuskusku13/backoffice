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
          label: "Chiffre d'affaire",
          data: [10, 20, 80, 40, 50, 10, 70],
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
