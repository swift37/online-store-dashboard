import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  PageSizeOption,
  PaginationOptions,
} from '../../interfaces/pagination-options.interface';

export interface PageOption {
  label: string;
  page: number;
}

@Component({
  selector: 'app-data-grid-pagination',
  templateUrl: './data-grid-pagination.component.html',
  styleUrl: './data-grid-pagination.component.scss',
})
export class DataGridPaginationComponent implements OnChanges {
  @Input({ required: true })
  public paginationOptions!: PaginationOptions;

  @Output() pageChanged = new EventEmitter<number>();
  @Output() pageSizeChanged = new EventEmitter<number>();

  public pageOptions: PageOption[] = [];

  public onPageChanged(pageOpt: PageOption | number): void {
    const page = typeof pageOpt == 'number' ? pageOpt : pageOpt.page;

    if (
      this.paginationOptions &&
      page > 0 &&
      page <= this.paginationOptions.pagesTotal
    ) {
      this.pageChanged.emit(page);
    }
  }

  public onPageSizeChanged(sizeOpt: PageSizeOption): void {
    if (
      this.paginationOptions?.pageSizeOptions
        .map((opt) => opt.size)
        .includes(sizeOpt.size) &&
      this.paginationOptions?.pageSize != sizeOpt.size
    ) {
      this.pageSizeChanged.emit(sizeOpt.size);
    }
  }

  //---------- Lifecycle methods start ----------

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paginationOptions']) {
      const pagesTotal = this.paginationOptions?.pagesTotal || 1;

      for (let index = 1; index <= pagesTotal; index++) {
        this.pageOptions.push({
          label: index.toString(),
          page: index,
        });
      }
    }
  }

  //---------- Lifecycle methods end ----------
}
