export interface PageSizeOption {
  size: number;
  label: string;
}

export interface PaginationOptions {
  currentPage: number;
  pagesTotal: number;
  itemsTotal: number;
  pageSize: number;
  pageSizeOptions: PageSizeOption[];
}
