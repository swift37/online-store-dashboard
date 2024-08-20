import { Injectable } from '@angular/core';
import { TimeSpanOption } from '../interfaces/time-span-option.interface';
import { TimeSpan } from '../interfaces/time-span.interface';

@Injectable()
export class DateTimeService {
  constructor() {}

  public startOfYear(date: Date = new Date()): Date {
    return new Date(date.getFullYear(), 0, 1);
  }

  public startOfMonth(date: Date = new Date()): Date {
    return new Date(date.setDate(1));
  }

  public startOfWeek(date: Date = new Date()): Date {
    const diff =
      date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  public subtractYears(yearsNumber: number, date: Date = new Date()): Date {
    const lastYear = date.getFullYear() - yearsNumber;
    return new Date(date.setFullYear(lastYear));
  }

  public subtractMonths(monthsNumber: number, date: Date = new Date()): Date {
    const diff = date.getMonth() - monthsNumber;
    return new Date(date.setMonth(diff));
  }

  public subtractWeeks(weeksNumber: number, date: Date = new Date()): Date {
    const diff = date.getDate() - weeksNumber * 7;
    return new Date(date.setDate(diff));
  }

  public subtractDays(daysNumber: number, date: Date = new Date()): Date {
    const diff = date.getDate() - daysNumber;
    return new Date(date.setDate(diff));
  }

  public lastWeek(relativeCount: boolean = false): TimeSpan {
    return {
      from: relativeCount ? this.startOfWeek() : this.subtractWeeks(1),
      to: new Date(),
    };
  }

  public lastMonth(relativeCount: boolean = false): TimeSpan {
    return {
      from: relativeCount ? this.startOfMonth() : this.subtractMonths(1),
      to: new Date(),
    };
  }

  public lastYear(relativeCount: boolean = false): TimeSpan {
    return {
      from: relativeCount ? this.startOfYear() : this.subtractYears(1),
      to: new Date(),
    };
  }

  public todayCheck(date: Date): boolean {
    return (
      new Date().setHours(0, 0, 0, 0) === new Date(date).setHours(0, 0, 0, 0)
    );
  }

  public createCalendar(date: Date = new Date()): Date[] {
    const firstDay: Date = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay: Date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const daysInMonth: number = lastDay.getDate();
    const days: Date[] = Array.from(Array(daysInMonth)).map(
      (v, i) => new Date(date.getFullYear(), date.getMonth(), i + 1)
    );

    const initialGap = firstDay.getDay() - 1;
    days.unshift(...Array(initialGap).fill(null));

    const endGap = lastDay.getDay() && 7 - lastDay.getDay();
    days.push(...Array(endGap).fill(null));

    return days;
  }

  public createTimeSpanOptions(
    relativeCount: boolean = false
  ): TimeSpanOption[] {
    return [
      {
        id: 0,
        label: 'All Time',
        timeSpan: {
          from: new Date(2000),
          to: new Date(),
        },
      },
      {
        id: 1,
        label: (relativeCount ? 'This' : 'Last') + ' Week',
        timeSpan: {
          from: relativeCount ? this.startOfWeek() : this.subtractWeeks(1),
          to: new Date(),
        },
      },
      {
        id: 2,
        label: (relativeCount ? 'This' : 'Last') + ' Month',
        timeSpan: {
          from: relativeCount ? this.startOfMonth() : this.subtractMonths(1),
          to: new Date(),
        },
      },
      {
        id: 3,
        label: (relativeCount ? 'This' : 'Last') + ' Year',
        timeSpan: {
          from: relativeCount ? this.startOfYear() : this.subtractYears(1),
          to: new Date(),
        },
      },
    ];
  }

  public dateEquality(
    firstDate: Date | string | null,
    secondDate: Date | string | null
  ): boolean {
    if (!firstDate || !secondDate) {
      return false;
    }

    return (
      new Date(firstDate).setHours(0, 0, 0, 0) ===
      new Date(secondDate).setHours(0, 0, 0, 0)
    );
  }

  public isInRange(
    startDate: Date | string | null,
    endDate: Date | string | null,
    testingDate: Date | string | null
  ) {
    if (!startDate || !endDate || !testingDate) {
      return false;
    }

    return (
      new Date(startDate).setHours(0, 0, 0, 0) <=
        new Date(testingDate).setHours(0, 0, 0, 0) &&
      new Date(endDate).setHours(0, 0, 0, 0) >=
        new Date(testingDate).setHours(0, 0, 0, 0)
    );
  }
}
