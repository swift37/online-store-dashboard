import { StatusesService } from '../../../core/services/statuses.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PaginationOptions } from '../../interfaces/pagination-options.interface';
import { DataGridColumnDef } from '../../interfaces/data-grid-col-def.interface';

export interface SortedField {
  field: string;
  descending: boolean;
}

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss',
})
export class DataGridComponent implements OnInit, OnChanges {
  @Input({ required: true })
  public gridTitle!: string;
  @Input({ required: true })
  public columnDefs!: DataGridColumnDef[];
  @Input({ required: true })
  public identifierField: string = 'id';
  @Input({ required: true })
  public data!: any[];
  @Input()
  public paginationOptions?: PaginationOptions;

  @Output() itemsChanged = new EventEmitter<any[]>();
  @Output() pageChanged = new EventEmitter<number>();
  @Output() pageSizeChanged = new EventEmitter<number>();
  @Output() filtersApplied = new EventEmitter<any>();

  public originalData: any[] = [];
  public sortedFields: SortedField[] = [];

  public selectedIds: any[] = [];

  constructor(public statusesService: StatusesService) {}

  public onItemsChanged(items: any[]) {
    const existItemIds: any[] = this.data.map(
      (item) => item[this.identifierField]
    );
    const itemsExistence: boolean = items.every((item) =>
      existItemIds.includes(item[this.identifierField])
    );

    if (itemsExistence) {
      this.itemsChanged.emit(items);
    }
  }

  public applySorting(sortByField: string): void {
    const field: SortedField | undefined = this.sortedFields.find(
      (sf) => sf.field == sortByField
    );

    if (field?.descending) {
      const index = this.sortedFields.indexOf(field);
      this.sortedFields.splice(index, 1);
    } else if (field) {
      field.descending = true;
    } else {
      this.sortedFields.push({
        field: sortByField,
        descending: false,
      });
    }

    if (this.sortedFields.length) {
      this.sortBy(this.sortedFields);
    } else {
      this.sortDefault();
    }

    this.data = [...this.data];
  }

  public onActionsApply(formValue?: any): void {
    if (formValue) {
      const itemsToChange: any[] = this.data.filter((item) =>
        this.selectedIds.includes(item[this.identifierField])
      );
      for (const [key, value] of Object.entries(formValue)) {
        itemsToChange.forEach((item) => (item[key] = value));
      }
      this.itemsChanged.emit(itemsToChange);
    }
  }

  public toggleItemCheck(itemId: any) {
    const index = this.selectedIds.indexOf(itemId);
    if (index === -1) {
      this.selectedIds.push(itemId);
    } else {
      this.selectedIds.splice(index, 1);
    }
  }

  public onSelectAll(state: boolean) {
    if (state) {
      this.selectedIds = this.data.map((item) => item[this.identifierField]);
    } else {
      this.selectedIds = [];
    }
  }

  public checkSortApplying(field: string): boolean {
    return !!this.sortedFields.find((sf) => sf.field == field);
  }

  public isSortOrderDesc(field: string): boolean {
    return !!this.sortedFields.find((sf) => sf.field == field)?.descending;
  }

  private sortBy(fields: SortedField[]): void {
    this.data.sort((a, b) => {
      let result: number = 0;
      for (let index = 0; index < fields.length && result == 0; index++) {
        const sortedField = fields[index];
        result = this.compareFields(a[sortedField.field], b[sortedField.field]);
        if (sortedField.descending) result *= -1;
      }
      return result;
    });
  }

  private compareFields(a: any, b: any): number {
    switch (typeof a) {
      case 'string':
        return (a || '').localeCompare(b || '');
      case 'number' || 'boolean':
        return Number(a || 0) - Number(b || 0);
      default:
        console.warn('Sorting is not feasible with such a field type.');
        return 0;
    }
  }

  private sortDefault(): void {
    const idField: SortedField = {
      field: this.identifierField,
      descending: false,
    };
    this.sortBy([idField]);
  }

  //---------- Lifecycle methods start ----------

  ngOnInit(): void {
    this.columnDefs.forEach((def) => {
      if (def.isStatusCol && !def.statusColSettings) {
        console.error(
          'Data Grid: The settings of the status column were not defined.'
        );
      }
      if (
        (!!def.filteredByOptions || !!def.filteredByRange) &&
        !!def.filteredByDate
      ) {
        console.error(
          'Data Grid: The field may be filtered by a single filter type.'
        );
      }
    });

    this.sortDefault();
  }

  ngOnChanges(changes: SimpleChanges): void {}

  //---------- Lifecycle methods end ----------
}
