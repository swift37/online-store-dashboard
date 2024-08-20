import { Component, Input } from '@angular/core';
import { Status } from '../../interfaces/status.interface';

export interface InfoCardHeader {
  title?: string;
  subtitle?: string;
  highlightedSubtitle?: string;
  status?: Status;
}

export interface InfoItem {
  label: string;
  content: string;
}

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss',
})
export class InfoCardComponent {
  @Input()
  public iconName?: string;
  @Input()
  public iconStyle: string = 'light';
  @Input()
  public iconColor: 'primary' | 'secondary' = 'secondary';
  @Input()
  public largeIcon: boolean = false;
  @Input()
  public header?: InfoCardHeader;
  @Input({ required: true })
  public set data(value: InfoItem[]) {
    if (value.length > 2) {
      console.error(
        'SummaryCard: There are should be no more than three items'
      );
      this._data = value.slice(0, 1);
    }

    this._data = value;
  }

  public get data() {
    return this._data;
  }

  private _data: InfoItem[] = [];
}
