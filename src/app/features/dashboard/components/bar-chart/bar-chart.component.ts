import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BarChartData } from '../../interfaces/bar-chart-data.interface';
import { animate, style, transition, trigger } from '@angular/animations';
import { DataSetOption } from '../../interfaces/data-set-option.interface';
import { SharedModule } from '../../../../shared/shared.module';
import { TimeSpanOption } from '../../../../shared/interfaces/time-span-option.interface';
import { TimeSpan } from '../../../../shared/interfaces/time-span.interface';

function roundUpToNearestTens(number: number) {
  let isNegative: boolean = false;
  if (number < 0) {
    isNegative = true;
    number *= -1;
  }

  const orderOfMagnitude = Math.pow(10, Math.floor(Math.log10(number)));
  const result = Math.ceil(number / orderOfMagnitude) * orderOfMagnitude;
  return isNegative ? result * -1 : result;
}

function roundDownToNearestTens(number: number) {
  let isNegative: boolean = false;
  if (number < 0) {
    isNegative = true;
    number *= -1;
  }

  const orderOfMagnitude = Math.pow(10, Math.floor(Math.log10(number)));
  const result = Math.floor(number / orderOfMagnitude) * orderOfMagnitude;
  return isNegative ? result * -1 : result;
}

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
  animations: [
    trigger('bar', [
      transition('void => *', [
        style({
          height: 0,
        }),
        animate(500),
      ]),
    ]),
  ],
})
export class BarChartComponent implements OnChanges {
  @Input()
  public dataSets: DataSetOption[] = [];
  @Input()
  public selectedDateSetId: number = 0;
  @Input()
  public timeSpans: TimeSpanOption[] = [];
  @Input()
  public selectedTimeSpanId: number = 0;
  @Input()
  public data: BarChartData[] = [];
  @Input()
  public maxValue: number = 0;
  @Input()
  public minValue: number = 0;

  public valuesRange: number = 0;

  public axisY: number[] = [];

  @Output() dataSetChanged = new EventEmitter<DataSetOption>();
  @Output() timeSpanChanged = new EventEmitter<TimeSpan>();

  public onDataSetChanged(dataSetOpt: DataSetOption) {
    this.dataSetChanged.emit(dataSetOpt);
  }

  public onTimeSpanChanged(timeSpanOpt: TimeSpanOption) {
    this.timeSpanChanged.emit(timeSpanOpt.timeSpan);
  }

  private computeAxisY(): void {
    const values: number[] = this.data.map((d) => d.value);

    let max: number = Math.max(...values);
    max = max > this.maxValue ? max : this.maxValue;
    this.maxValue = roundUpToNearestTens(max);

    let min: number = Math.min(...values);
    min = min < this.minValue ? min : this.minValue;
    this.minValue = min < 0 ? roundDownToNearestTens(min) : min;

    this.valuesRange = this.maxValue - this.minValue;

    const step: number = (this.maxValue - this.minValue) / 5;
    for (let index = 0; index < 6; index++) {
      const value = this.maxValue - step * index;
      this.axisY.push(value);
    }
  }

  //---------- Lifecycle methods start ----------

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.computeAxisY();
    }
  }

  //---------- Lifecycle methods end ----------
}
