import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { TimeSpanOption } from '../../interfaces/time-span-option.interface';
import { TimeSpan } from '../../interfaces/time-span.interface';

export interface SummaryItem {
  label: string;
  value?: number;
  valueInPercent?: number;
  progressInPercent?: number;
  redLabel?: boolean;
}

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss',
})
export class SummaryCardComponent {
  @Input()
  public timeSpans: TimeSpanOption[] = [];
  @Input()
  public selectedTimeSpanId: number = 0;
  @Input()
  public iconName?: string;
  @Input()
  public iconStyle: string = 'light';
  @Input()
  public iconColor: 'primary' | 'secondary' = 'primary';
  @Input({ required: true })
  public set data(value: SummaryItem[]) {
    if (value.length > 3) {
      console.error(
        'SummaryCard: There are should be no more than three items'
      );
      this._data = value.slice(0, 2);
    }

    this._data = value;
  }

  @HostBinding('class.primary')
  @Input()
  public primaryStyle: boolean = false;

  public get data() {
    return this._data;
  }

  private _data: SummaryItem[] = [];

  @Output() timeSpanChanged = new EventEmitter<TimeSpan>();

  public onTimeSpanChanged(timeSpanOpt: TimeSpanOption) {
    this.timeSpanChanged.emit(timeSpanOpt.timeSpan);
  }
}
