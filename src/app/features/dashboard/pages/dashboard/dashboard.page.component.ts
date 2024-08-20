import { Component, OnInit } from '@angular/core';
import { DoughnutChartComponent } from '../../components/doughnut-chart/doughnut-chart.component';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { RecentOrdersComponent } from '../../components/recent-orders/recent-orders.component';
import { DoughnutChartData } from '../../interfaces/doughnut-chart-data.interface';
import { BarChartData } from '../../interfaces/bar-chart-data.interface';
import { DataSetOption } from '../../interfaces/data-set-option.interface';
import { SharedModule } from '../../../../shared/shared.module';
import { SummaryItem } from '../../../../shared/components/summary-card/summary-card.component';
import { TimeSpanOption } from '../../../../shared/interfaces/time-span-option.interface';
import { DateTimeService } from '../../../../shared/services/date-time.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    SharedModule,
    DoughnutChartComponent,
    BarChartComponent,
    RecentOrdersComponent,
  ],
  templateUrl: './dashboard.page.component.html',
  styleUrl: './dashboard.page.component.scss',
})
export class DashboardPageComponent implements OnInit {
  public testSummaryData: SummaryItem[] = [
    {
      label: 'All Orders',
      value: 0,
      progressInPercent: 25.78,
    },
    {
      label: 'Pending',
      value: 0,
      progressInPercent: -15.81,
    },
  ];

  public testSummaryData3Cols: SummaryItem[] = [
    {
      label: 'All Orders',
      value: 0,
      progressInPercent: 25.78,
    },
    {
      label: 'Pending',
      value: 0,
      progressInPercent: -15.81,
    },
    {
      label: 'Completed',
      value: 0,
      progressInPercent: 37.25,
    },
  ];

  public doughnutChartTestData: DoughnutChartData[] = [
    {
      label: 'Acquisition',
      value: 550,
      color: '#5570F1',
    },
    {
      label: 'Purchase',
      value: 375,
      color: '#97A5EB',
    },
    {
      label: 'Retention',
      value: 125,
      color: '#FFCC91',
    },
  ];

  public barChartTestData: BarChartData[] = [
    {
      label: 'Sep 10',
      value: 90000,
    },
    {
      label: 'Sep 11',
      value: 40000,
    },
    {
      label: 'Sep 12',
      value: 67000,
    },
    {
      label: 'Sep 13',
      value: 28000,
    },
    {
      label: 'Sep 14',
      value: 85000,
    },
    {
      label: 'Sep 15',
      value: 48000,
    },
    {
      label: 'Sep 16',
      value: 87000,
    },
  ];

  public barChartDataSets: DataSetOption[] = [
    { id: 0, label: 'Sales' },
    { id: 1, label: 'Customers' },
    { id: 2, label: 'Orders' },
  ];

  public relTimeSpans: TimeSpanOption[] = [];

  public absTimeSpans: TimeSpanOption[] = [];

  constructor(private dateTimeService: DateTimeService) {}

  //---------- Lifecycle methods start ----------

  ngOnInit(): void {
    this.relTimeSpans = this.dateTimeService.createTimeSpanOptions(true);
    this.absTimeSpans = this.dateTimeService.createTimeSpanOptions();
  }

  //---------- Lifecycle methods end ----------
}
