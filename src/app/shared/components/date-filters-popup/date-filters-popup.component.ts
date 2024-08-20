import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { SelectSettings } from '../../interfaces/select-settings.interface';
import { DateTimeService } from '../../services/date-time.service';
import { TimeSpan } from '../../interfaces/time-span.interface';
import { TimeSpanOption } from '../../interfaces/time-span-option.interface';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormsService } from '../../../core/services/forms-service.service';

export interface YearOption {
  value: number;
}

export interface MonthOption {
  label: string;
  value: number;
}

@Component({
  selector: 'app-date-filters-popup',
  templateUrl: './date-filters-popup.component.html',
  styleUrl: './date-filters-popup.component.scss',
  animations: [
    trigger('datePicker', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0,
        }),
        animate(200),
      ]),
      transition(
        '* => void',
        animate(
          200,
          style({
            height: 0,
            opacity: 0,
          })
        )
      ),
    ]),
  ],
})
export class DateFiltersPopupComponent implements OnInit {
  @Input()
  public title: string = 'By Date';
  @Input({ required: true })
  public controlName!: string;
  @Input({ required: true })
  public filtersForm!: FormGroup;

  public calendar: Date[] = [];

  public selectedDate: Date = new Date();

  public initDate: Date = new Date();

  public yearsSelectOptions: YearOption[] = [];

  public monthSelectOptions: MonthOption[] = [];

  public monthSelectSettings: SelectSettings = {
    idPropKey: 'value',
    displayPropKey: 'label',
  };

  public yearSelectSettings: SelectSettings = {
    idPropKey: 'value',
    displayPropKey: 'value',
  };

  public timeSpanOptions: TimeSpanOption[] = [];

  public daysOfWeek: string[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  public indicatorStatus: 0 | 1 = 0;

  public tempEndDate: Date | null = null;

  @HostBinding('class.unfolded')
  public pickerIsOpen: boolean = true;

  @Output() filtersApplied = new EventEmitter<any>();

  constructor(
    private dateTimeService: DateTimeService,
    private formsService: FormsService
  ) {}

  public onApply(): void {
    this.filtersApplied.emit(this.filtersForm.value);
  }

  public changeCalendarMonth(
    yearOpt?: YearOption,
    monthOpt?: MonthOption
  ): void {
    if (yearOpt?.value) {
      this.selectedDate.setFullYear(yearOpt.value);
    }
    if (monthOpt?.value || monthOpt?.value == 0) {
      this.selectedDate.setMonth(monthOpt.value);
    }
    this.createCalendar();
  }

  public selectDate(date: Date): void {
    const dateRange = this.filtersForm.get(this.controlName)?.value as TimeSpan;

    if (dateRange.from && dateRange.to) {
      dateRange.from = null;
      dateRange.to = null;
      this.indicatorStatus = 0;
    }

    if (!dateRange.from || date <= dateRange.from) {
      dateRange.from = date;
      this.indicatorStatus = 1;
    } else {
      dateRange.to = date;
      this.tempEndDate = null;
      this.indicatorStatus = 0;
    }

    this.filtersForm.get(this.controlName)?.patchValue(dateRange);
  }

  public todayCheck(date: Date) {
    return this.dateTimeService.todayCheck(date);
  }

  public isRangeStart(date?: Date): boolean {
    if (!date) return false;

    const dateRange = this.filtersForm.get(this.controlName)?.value as TimeSpan;

    return this.dateTimeService.dateEquality(date, dateRange.from);
  }

  public isRangeEnd(date?: Date): boolean {
    if (!date) return false;

    const dateRange = this.filtersForm.get(this.controlName)?.value as TimeSpan;

    return this.dateTimeService.dateEquality(date, dateRange.to);
  }

  public isRangePreviewEnd(date?: Date): boolean {
    if (!date) return false;

    return this.dateTimeService.dateEquality(date, this.tempEndDate);
  }

  public inSelectedRange(date?: Date): boolean {
    if (!date) return false;

    const dateRange = this.filtersForm.get(this.controlName)?.value as TimeSpan;

    return this.dateTimeService.isInRange(dateRange.from, dateRange.to, date);
  }

  public previewRange(toDate: Date): void {
    const dateRange = this.filtersForm.get(this.controlName)?.value as TimeSpan;
    if (!dateRange.from || (dateRange.from && dateRange.to)) {
      return;
    }

    this.tempEndDate = toDate;
  }

  public inRangePreview(date: Date): boolean {
    const dateRange = this.filtersForm.get(this.controlName)?.value as TimeSpan;

    return this.dateTimeService.isInRange(
      dateRange.from,
      this.tempEndDate,
      date
    );
  }

  private addControlToForm(): void {
    const fromDate: Date = this.dateTimeService.subtractDays(10);
    const timeSpan: TimeSpan = {
      from: fromDate,
      to: new Date(),
    };

    this.formsService.addControlToForm(
      this.filtersForm,
      this.controlName,
      timeSpan,
      [Validators.required]
    );
  }

  private createCalendar(): void {
    this.calendar = this.dateTimeService.createCalendar(this.selectedDate);
  }

  private createYearOptions(fromYear: number): void {
    const currentYear = new Date().getFullYear();
    this.yearsSelectOptions = Array.from(Array(currentYear - fromYear)).map(
      (v, i) => {
        return {
          value: currentYear - i,
        };
      }
    );
  }

  private createMonthOptions(): void {
    const currentYear = new Date().getFullYear();
    this.monthSelectOptions = Array.from(Array(12)).map((v, i) => {
      return {
        label: new Date(currentYear, i).toLocaleString('default', {
          month: 'long',
        }),
        value: i,
      };
    });
  }

  private initTimeSpanOptions(): void {
    this.timeSpanOptions = this.dateTimeService
      .createTimeSpanOptions(true)
      .slice(1);
    this.timeSpanOptions.push(
      ...this.dateTimeService.createTimeSpanOptions().slice(1)
    );
  }

  //---------- Lifecycle methods start ----------

  ngOnInit(): void {
    this.createYearOptions(2000);
    this.createMonthOptions();
    this.initTimeSpanOptions();
    this.addControlToForm();
    this.createCalendar();
  }

  //---------- Lifecycle methods end ----------
}
