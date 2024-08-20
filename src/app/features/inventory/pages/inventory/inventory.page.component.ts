import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { INVENTORY_STATUSES } from '../../constants/statuses.const';
import { SharedModule } from '../../../../shared/shared.module';
import { StatusesService } from '../../../../core/services/statuses.service';
import { StatusOption } from '../../../../shared/interfaces/status-option.interface';
import { STATUSES_CONFIG } from '../../../../shared/constants/statuses-config.constant';
import { TimeSpanOption } from '../../../../shared/interfaces/time-span-option.interface';
import { StatusDesign } from '../../../../shared/enums/status-label-design.enum';
import { SummaryItem } from '../../../../shared/components/summary-card/summary-card.component';
import { DataGridColumnDef } from '../../../../shared/interfaces/data-grid-col-def.interface';
import { PaginationOptions } from '../../../../shared/interfaces/pagination-options.interface';
import { DateTimeService } from '../../../../shared/services/date-time.service';

@Component({
  selector: 'app-inventory-page',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './inventory.page.component.html',
  styleUrls: [
    '../../../../../styles/summary-page.scss',
    './inventory.page.component.scss',
  ],
  providers: [
    {
      provide: StatusesService,
      useFactory: (config: StatusOption[]) => new StatusesService(config),
      deps: [STATUSES_CONFIG],
    },
    {
      provide: STATUSES_CONFIG,
      useValue: INVENTORY_STATUSES,
    },
  ],
})
export class InventoryPageComponent implements OnInit {
  public relTimeSpans: TimeSpanOption[] = [];

  public statusDesign = StatusDesign;

  public itemsSummaryData: SummaryItem[] = [
    {
      label: 'All Products',
      value: 350,
    },
    {
      label: 'Active',
      value: 316,
      progressInPercent: 86,
    },
    {
      label: 'Low Stock Alert',
      value: 23,
      redLabel: true,
    },
    {
      label: 'Expired',
      value: 3,
    },
    {
      label: 'Low Rating',
      value: 2,
    },
  ];

  public items = [
    {
      id: 0,
      image: '',
      productName: 'Iphone 15 Pro',
      category: 'Smartphones',
      inStock: 8,
      unitPrice: '$1199.00',
      discount: '$0.00',
      totalPrice: '$1199.00',
      status: 'published',
    },
    {
      id: 1,
      image: '',
      productName: 'Iphone 14 Pro',
      category: 'Smartphones',
      inStock: 12,
      unitPrice: '$1049.00',
      discount: '$0.00',
      totalPrice: '$1049.00',
      status: 'published',
    },
    {
      id: 2,
      image: '',
      productName: 'Iphone 15 Pro Max',
      category: 'Smartphones',
      inStock: 21,
      unitPrice: '$1349.00',
      discount: '$0.00',
      totalPrice: '$1349.00',
      status: 'unpublished',
    },
    {
      id: 3,
      image: '',
      productName: 'Apple MacBook Pro M3 Pro',
      category: 'Laptops',
      inStock: 34,
      unitPrice: '$2799.00',
      discount: '$200.00',
      totalPrice: '$2599.00',
      status: 'archived',
    },
    {
      id: 4,
      image: '',
      productName: 'ASUS ROG Zephyrus G16',
      category: 'Laptops',
      inStock: 27,
      unitPrice: '$3499.00',
      discount: '$0.00',
      totalPrice: '$3499.00',
      status: 'Published',
    },
  ];

  public categories = [
    {
      value: 'Smartphones',
    },
    {
      value: 'Laptops',
    },
  ];

  public gridColumnDefs: DataGridColumnDef[] = [
    {
      field: 'image',
      displayName: '',
      isImageCol: true,
    },
    {
      field: 'productName',
      displayName: 'Product Name',
    },
    {
      field: 'category',
      displayName: 'Category',
      filteredByOptions: {
        options: this.categories,
        settings: {
          idPropKey: 'value',
          displayPropKey: 'value',
        },
      },
    },
    {
      field: 'inStock',
      displayName: 'In-Stock',
      filteredByRange: true,
    },
    {
      field: 'unitPrice',
      displayName: 'Unit Price',
      filteredByRange: true,
    },
    {
      field: 'discount',
      displayName: 'Discount',
      filteredByRange: true,
    },
    {
      field: 'totalPrice',
      displayName: 'Total Price',
      filteredByRange: true,
    },
    {
      field: 'status',
      displayName: 'Status',
      isStatusCol: true,
      statusColSettings: {
        statuses: INVENTORY_STATUSES,
        editable: true,
      },
      filteredByOptions: {
        options: INVENTORY_STATUSES,
        settings: {
          idPropKey: 'currentState',
          displayPropKey: 'label',
        },
      },
    },
  ];

  public testPaginationOptions: PaginationOptions = {
    currentPage: 1,
    pagesTotal: 44,
    itemsTotal: 300,
    pageSize: 15,
    pageSizeOptions: [
      {
        label: '10',
        size: 10,
      },
      {
        label: '15',
        size: 15,
      },
      {
        label: '20',
        size: 20,
      },
      {
        label: '25',
        size: 25,
      },
      {
        label: '30',
        size: 30,
      },
    ],
  };

  constructor(private dateTimeService: DateTimeService) {}

  //---------- Lifecycle methods start ----------

  ngOnInit(): void {
    this.relTimeSpans = this.dateTimeService.createTimeSpanOptions(true);
  }

  //---------- Lifecycle methods end ----------
}
