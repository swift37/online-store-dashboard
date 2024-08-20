import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FilterDef } from '../../interfaces/filter-def.interface';
import { DateFilterDef } from '../../interfaces/date-filter-def.interface';
import { BulkActionDef } from '../../interfaces/bulk-action-def.interface';
import { DataGridColumnDef } from '../../interfaces/data-grid-col-def.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import {
  animate,
  group,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FormsService } from '../../../core/services/forms-service.service';

@Component({
  selector: 'app-data-grid-controls',
  templateUrl: './data-grid-controls.component.html',
  styleUrl: './data-grid-controls.component.scss',
  animations: [
    trigger('popup', [
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
export class DataGridControlsComponent {
  @Input({ required: true })
  public columnDefs!: DataGridColumnDef[];

  @Output() filtersApplied = new EventEmitter<any>();
  @Output() actionsApplied = new EventEmitter<any[]>();

  @HostListener('document:click', ['$event'])
  closeDropdown(event: PointerEvent): void {
    if (
      this.filtersPopupState &&
      !this.filtersPopupRef?.nativeElement.contains(event.target)
    ) {
      this.filtersPopupState = false;
    }

    if (this.datePopupStates.includes(true)) {
      this.dateRangePopupRefs?.forEach((item, index) => {
        if (
          item &&
          !this.dateRangePopupRefs
            ?.get(index)
            ?.nativeElement.contains(event.target)
        )
          this.datePopupStates[index] = false;
      });
    }

    if (
      this.actionsPopupState &&
      !this.actionsPopupRef?.nativeElement.contains(event.target)
    ) {
      this.actionsPopupState = false;
    }
  }

  @ViewChild('filtersPopup') filtersPopupRef?: ElementRef;
  @ViewChildren('dateRangePopup') dateRangePopupRefs?: QueryList<ElementRef>;
  @ViewChild('actionsPopup') actionsPopupRef?: ElementRef;

  public filterDefs: FilterDef[] = [];
  public dateFilterDefs: DateFilterDef[] = [];
  public bulkActionDefs: BulkActionDef[] = [];

  public gridFiltersForm: FormGroup = new FormGroup({
    search: new FormControl(''),
  });
  public formChangeSub?: Subscription;

  public filtersPopupState: boolean = false;
  public datePopupStates: boolean[] = [];
  public actionsPopupState: boolean = false;

  constructor(private formsService: FormsService) {}

  public toggleFiltersPopup(formValue?: any): void {
    this.formsService.patchFormByValue(this.gridFiltersForm, formValue);

    this.filtersPopupState = !this.filtersPopupState;
  }

  public toggleDateRangePopup(index: number, formValue?: any): void {
    this.formsService.patchFormByValue(this.gridFiltersForm, formValue);

    this.datePopupStates[index] = !this.datePopupStates[index];
  }

  public toggleActionsPopup(formValue?: any): void {
    if (formValue) {
      this.actionsApplied.emit(formValue);
    }

    this.actionsPopupState = !this.actionsPopupState;
  }

  private defineFilterDefs(): void {
    this.columnDefs.forEach((def) => {
      if (def.filteredByOptions || def.filteredByRange) {
        const filterDef: FilterDef = {
          label: def.displayName,
          formControlName: def.field,
          type: def.filteredByOptions ? 'select' : 'range',
        };

        if (def.filteredByOptions) {
          Object.assign(filterDef, {
            selectParams: {
              options: def.filteredByOptions!.options,
              settings: def.filteredByOptions!.settings,
            },
          });
        }

        this.filterDefs.push(filterDef);
      } else if (def.filteredByDate) {
        const dateFilterDef: DateFilterDef = {
          label: def.displayName,
          formControlName: def.field,
        };

        this.dateFilterDefs.push(dateFilterDef);
      }
    });
  }

  private defineActionDefs(): void {
    const def = this.columnDefs.find(
      (def) => def.isStatusCol && def.statusColSettings?.editable
    );
    if (!def) return;

    const actionDef: BulkActionDef = {
      label: def.displayName,
      field: def.field,
      selectParams: {
        options: def.statusColSettings!.statuses,
        settings: {
          idPropKey: 'currentState',
          displayPropKey: 'label',
        },
      },
    };

    this.bulkActionDefs.push(actionDef);
  }

  //---------- Lifecycle methods start ----------

  ngOnInit(): void {
    const dateRangePopupsNumber: number = this.dateRangePopupRefs?.length ?? 0;
    for (let index = 0; index < dateRangePopupsNumber; index++) {
      this.datePopupStates[index] = false;
    }

    this.defineFilterDefs();
    this.defineActionDefs();
    this.formChangeSub = this.gridFiltersForm.controls['search'].valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => this.filtersApplied.emit(this.gridFiltersForm.value));
  }

  ngOnDestroy(): void {
    this.formChangeSub?.unsubscribe();
  }

  //---------- Lifecycle methods end ----------
}
