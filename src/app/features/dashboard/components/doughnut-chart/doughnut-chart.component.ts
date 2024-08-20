import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  Output,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DoughnutChartData } from '../../interfaces/doughnut-chart-data.interface';
import { Chart } from 'chart.js/auto';
import { isPlatformBrowser } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { TimeSpanOption } from '../../../../shared/interfaces/time-span-option.interface';
import { TimeSpan } from '../../../../shared/interfaces/time-span.interface';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss',
})
export class DoughnutChartComponent implements AfterViewInit, OnChanges {
  @Input()
  public data: DoughnutChartData[] = [];
  @Input()
  public timeSpans: TimeSpanOption[] = [];
  @Input()
  public selectedTimeSpanId: number = 0;
  @ViewChild('doughnutChart')
  private canvas!: ElementRef<HTMLCanvasElement>;

  @Output() timeSpanChanged = new EventEmitter<TimeSpan>();

  private context?: CanvasRenderingContext2D;
  private chart!: Chart<'doughnut'>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: InjectionToken<Object>
  ) {}

  public onTimeSpanChanged(timeSpanOpt: TimeSpanOption) {
    this.timeSpanChanged.emit(timeSpanOpt.timeSpan);
  }

  private createChart(): void {
    if (!this.context)
      this.context = this.canvas.nativeElement.getContext('2d')!;

    this.chart = new Chart(this.context, {
      type: 'doughnut',
      data: {
        labels: this.data.map((d) => d.label),
        datasets: [
          {
            data: this.data.map((d) => d.value),
            backgroundColor: this.data.map((d) => d.color),
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '75%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#fff',
            titleColor: '#53545c',
            titleFont: {
              family: 'Inter',
              size: 10,
              weight: 400,
              lineHeight: '11px',
            },
            bodyColor: '#8b8d97',
            bodyFont: {
              family: 'Inter',
              size: 9,
              weight: 400,
              lineHeight: '10px',
            },
            boxPadding: 3,
            usePointStyle: true,
          },
        },
      },
    });
  }

  //---------- Lifecycle methods start ----------

  ngOnChanges(changes: SimpleChanges): void {
    if (
      isPlatformBrowser(this.platformId) &&
      changes['data'] &&
      this.data &&
      !changes['data'].isFirstChange
    ) {
      this.createChart();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.createChart();
      this.chart.update();
    }
  }

  //---------- Lifecycle methods end ----------
}
