import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { SelectSettings } from '../../interfaces/select-settings.interface';
import { SelectedData } from '../../interfaces/selected-data.interface';
import {
  animate,
  group,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-mini-select',
  templateUrl: './mini-select.component.html',
  styleUrl: './mini-select.component.scss',
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
export class MiniSelectComponent implements OnInit {
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

  @HostBinding('class.enlarged-text')
  @Input()
  public enlargedText: boolean = false;

  @HostBinding('class.open-upward')
  @Input()
  public openUpward: boolean = false;

  @HostBinding('class')
  @Input()
  public design?:
    | 'primary'
    | 'primary-transparent'
    | 'dark-transparent'
    | 'transparent';

  @Output() onChange = new EventEmitter<SelectedData>();

  @HostListener('document:click', ['$event'])
  closeDropdown(event: PointerEvent): void {
    if (
      this.isDropdownOpen &&
      !this._element.nativeElement.contains(event.target)
    )
      this.isDropdownOpen = false;
  }

  public itemSizePx: number = 28;

  public isDropdownOpen: boolean = false;

  constructor(private _element: ElementRef) {}

  public toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  public onSelect(option: any, index: number): void {
    if (!this.disabled) {
      const newValue = option?.[this.settings.idPropKey];
      this.value = newValue;
      this.toggleDropdown();

      const selectedData: SelectedData = {
        selectedIndexes: [index],
        selectedOptions: [option],
      };

      this.onChange.emit(selectedData);
    }
  }

  public displayedValue(): any {
    return this.options.find(
      (opt) => opt?.[this.settings.idPropKey] === this.value
    )?.[this.settings.displayPropKey];
  }

  //---------- Lifecycle methods start ----------

  ngOnInit(): void {
    if (this.enlargedText) {
      this.itemSizePx = 32;
    }
  }

  //---------- Lifecycle methods end ----------
}
