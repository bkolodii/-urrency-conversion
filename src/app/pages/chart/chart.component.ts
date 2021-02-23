import { Component, OnInit } from '@angular/core';
import { ViewChild } from "@angular/core";
import { Store } from '@ngrx/store';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { HistoryCurrChangeAction } from 'src/app/redux/actions/historyCurr';
import { CurrencyService } from 'src/app/services/currency.service';
import { State } from 'src/app/interfaces/state.interface';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  state: State;  
  constructor(public currService: CurrencyService, public store: Store<State>) {
    this.chartOptions = {
      series: [
        {
          name: "Desktops",
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Currency converter",
        align: "center"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021"
        ]
      }
    };
  }

  ngOnInit(): void {
    this.currService.history.subscribe(data => {
      if (data[0].length > 0 && data[1].length > 0) {
        this.store.dispatch(new HistoryCurrChangeAction(data))
        this.buildChart()
      }
    })
  }
  buildChart(): void {
    this.store.subscribe(data => {
      this.state = JSON.parse(JSON.stringify(data))
      this.chartOptions = {
        series: [
          {
            name: "Desktops",
            data: this.state.history.result.map(keys => {
              return +keys.toFixed(2)
            })
          }
        ],
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Currency converter",
          align: "center"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: this.state.history.date.map(key => {
            return key.substr(0,4)
          })
        }
      };
    })
  }

}
