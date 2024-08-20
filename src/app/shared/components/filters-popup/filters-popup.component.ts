import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterDef } from '../../interfaces/filter-def.interface';
import { FormsService } from '../../../core/services/forms-service.service';

@Component({
  selector: 'app-filters-popup',
  templateUrl: './filters-popup.component.html',
  styleUrl: './filters-popup.component.scss',
})
export class FiltersPopupComponent implements OnInit {
  @Input({ required: true })
  public filterDefs: FilterDef[] = [];
  @Input({ required: true })
  public filtersForm!: FormGroup;

  @Output() filtersApplied = new EventEmitter<any>();

  constructor(private formsService: FormsService) {}

  public onApply(): void {
    this.filtersApplied.emit(this.filtersForm.value);
  }

  private addControlsToForm() {
    this.filterDefs.forEach((def) => {
      if (def.type == 'range') {
        this.formsService.addRangeControlToForm(
          this.filtersForm,
          def.formControlName,
          def.initRange
        );
      } else {
        this.formsService.addControlToForm(
          this.filtersForm,
          def.formControlName,
          def.selectParams?.selectedValue
        );
      }
    });
  }

  //---------- Lifecycle methods start ----------

  ngOnInit(): void {
    this.addControlsToForm();
  }

  //---------- Lifecycle methods end ----------
}
