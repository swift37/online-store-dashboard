import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-default-input',
  templateUrl: './default-input.component.html',
  styleUrl: './default-input.component.scss',
})
export class DefaultInputComponent implements OnChanges {
  @Input() type: string = 'text';
  @Input() id?: string;
  @Input() value?: any;
  @Input() placeholder?: string;
  @Input() label?: string;
  @Input() iconName?: string;
  @Input() iconPosition: string = 'left';
  @Input() disabled: boolean = false;

  public iconStyle: string = 'light';

  ngOnChanges(changes: SimpleChanges): void {
    console.log('change');
    if (this.iconPosition != 'left' && this.iconPosition != 'right') {
      console.error("Icon position should be 'left' or 'right'");
    }

    if (this.type == 'date') {
      this.iconName = 'calendar';
    } else if (this.type == 'time') {
      this.iconName = 'fi_clock';
      this.iconStyle = 'feather';
    }
  }
}
