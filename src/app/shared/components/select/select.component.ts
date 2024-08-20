import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
  SimpleChanges,
} from '@angular/core';
import { ControlBaseComponent } from '../control-base/control-base.component';
import { FormControl, NgControl } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
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
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['../../styles/custom-control.scss', './select.component.scss'],
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
export class SelectComponent
  extends ControlBaseComponent<any>
  implements OnInit, OnChanges, OnDestroy
{
  @Input()
  public id?: string;
  @Input()
  public label?: string;
  @Input()
  public innerLabel: boolean = false;
  @Input()
  public placeholder: string = 'Select an option';
  @Input()
  public iconName?: string;
  @Input()
  public iconStyle: string = 'light';
  @Input()
  public multiple: boolean = false;
  @Input()
  public checkboxPosition: 'left' | 'right' = 'left';
  @Input()
  public withSearch: boolean = false;
  @Input({ required: true })
  public options: any[] = [];
  @Input()
  public maxVisibleOptions: number = 7;
  @Input({ required: true })
  public settings!: SelectSettings;

  @Input()
  public filledStyle: boolean = false;
  @Input()
  public slim: boolean = false;
  @Input()
  public emphasizedText: boolean = false;
  @Input()
  public hideCheck: boolean = false;

  @Input()
  public openUpward: boolean = false;

  @Output() onChange = new EventEmitter<SelectedData>();

  @HostListener('document:click', ['$event'])
  closeDropdown(event: PointerEvent): void {
    if (
      this.isDropdownOpen &&
      !this._element.nativeElement.contains(event.target)
    )
      this.isDropdownOpen = false;
  }

  public originalOptions: any[] = [];

  public searchControl: FormControl = new FormControl();

  public currentDisplayValue?: string;

  public visibleOptionsNumber: number = 0;

  public isDropdownOpen: boolean = false;

  public selectedIndexes: number[] = [];
  private selectedOptions: any[] = [];

  private searchSub?: Subscription;

  constructor(
    @Optional() @Self() private _ngControl: NgControl,
    private _element: ElementRef
  ) {
    super(_ngControl);
  }

  public toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  public onSelect(option: any, index: any): void {
    this.value = option?.[this.settings.idPropKey];
    this.changed(this.value);
    this.updateDisplayValue();
    this.toggleDropdown();

    const selectedData: SelectedData = {
      selectedIndexes: [index],
      selectedOptions: [option],
    };

    this.onChange.emit(selectedData);
  }

  public onMultiSelect(option: any, index: number, event: Event): void {
    const checked: boolean = (<HTMLInputElement>event.target).checked;
    const optionKey: any = option?.[this.settings.idPropKey];
    const indexIncluded = this.selectedIndexes.includes(index);
    const optionIncluded = this.selectedOptions.includes(option);

    if (!this.value) {
      this.value = [];
    }

    const optionKeyIncluded = this.value.includes(optionKey);

    if (checked && !indexIncluded) {
      this.selectedIndexes.push(index);
    } else if (!checked && indexIncluded) {
      const indexOf = this.selectedIndexes.indexOf(index);
      this.selectedIndexes.splice(indexOf);
    }

    if (checked && !optionIncluded) {
      this.selectedOptions.push(option);
    } else if (!checked && optionIncluded) {
      const index = this.selectedOptions.indexOf(option);
      this.selectedOptions.splice(index);
    }

    if (checked && !optionKeyIncluded) {
      this.value.push(optionKey);
    } else if (!checked && optionKeyIncluded) {
      const index = this.value.indexOf(optionKey);
      this.value.splice(index);
    } else {
      return;
    }

    let selectedData: SelectedData = {
      selectedIndexes: this.selectedIndexes,
      selectedOptions: this.selectedOptions,
    };

    this.onChange.emit(selectedData);

    this.changed(this.value);
    this.updateDisplayValue();
  }

  public search(value: string): void {
    this.options = this.originalOptions.filter((option) =>
      option[this.settings.displayPropKey]
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    requestAnimationFrame(
      () => (this.visibleOptionsNumber = this.options.length || 1)
    );
  }

  private updateDisplayValue(): void {
    const values: string[] = [];
    if (this.multiple) {
      for (let index = 0; index < this.value.length; index++) {
        const matchingOption = this.options.find(
          (opt) => opt?.[this.settings.idPropKey] === this.value[index]
        );

        if (matchingOption) {
          values.push(matchingOption[this.settings.displayPropKey]);
        }
      }

      this.currentDisplayValue = values.join(', ');
    } else {
      const matchingOption = this.options.find(
        (opt) => opt?.[this.settings.idPropKey] === this.value
      );

      this.currentDisplayValue =
        matchingOption && matchingOption[this.settings.displayPropKey];
    }
  }

  //---------- Lifecycle methods start ----------

  override ngOnInit(): void {
    super.ngOnInit();

    this.visibleOptionsNumber = this.options.length;

    this.originalOptions = [...this.options];

    this.updateDisplayValue();

    this.searchSub = this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((term) => this.search(term));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && !changes['options'].isFirstChange()) {
      if (!this.options) {
        this.options = [];
      }

      this.visibleOptionsNumber = this.options.length;

      this.originalOptions = [...this.options];
    }
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
  }

  //---------- Lifecycle methods end ----------
}
