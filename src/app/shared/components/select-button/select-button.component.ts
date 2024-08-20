import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { SelectSettings } from '../../interfaces/select-settings.interface';
import {
  animate,
  group,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-select-button',
  templateUrl: './select-button.component.html',
  styleUrl: './select-button.component.scss',
  animations: [
    trigger('dropdown', [
      transition('void => *', [
        style({
          height: 0,
          overflow: 'hidden',
        }),
        group([
          animate(150, style({ height: '*' })),
          animate(300, style({ overflow: 'visible' })),
        ]),
      ]),
      transition('* => void', [
        style({
          overflow: 'hidden',
        }),
        animate(
          150,
          style({
            height: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class SelectButtonComponent {
  @Input()
  public id?: string;
  @Input()
  public value: any;
  @Input({ required: true })
  public options: any[] = [];
  @Input()
  public maxVisibleOptions: number = 7;
  @Input()
  public disabled: boolean = false;
  @Input({ required: true })
  public settings!: SelectSettings;

  @Output() onClick = new EventEmitter<any>();

  @HostListener('document:click', ['$event'])
  closeDropdown(event: PointerEvent): void {
    if (
      this.isDropdownOpen &&
      !this._element.nativeElement.contains(event.target)
    )
      this.isDropdownOpen = false;
  }

  public itemSizePx: number = 30;

  public isDropdownOpen: boolean = false;

  constructor(private _element: ElementRef) {}

  public toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  public onClickButton(): void {
    this.onClick.emit(this.value);
    console.log(this.value);
  }

  public onSelect(option: any): void {
    if (!this.disabled) {
      const newValue = option?.[this.settings.idPropKey];
      this.value = newValue;
      this.toggleDropdown();
    }
  }

  public displayedValue(): any {
    return this.options.find(
      (opt) => opt?.[this.settings.idPropKey] === this.value
    )?.[this.settings.displayPropKey];
  }
}
