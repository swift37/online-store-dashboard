import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewOrderModalComponent } from '../../components/new-order-modal/new-order-modal.component';
import { Subscription } from 'rxjs';
import { ORDER_STATUSES } from '../../constants/statuses.constant';
import { SharedModule } from '../../../../shared/shared.module';
import { StatusesService } from '../../../../core/services/statuses.service';
import { STATUSES_CONFIG } from '../../../../shared/constants/statuses-config.constant';
import { StatusOption } from '../../../../shared/interfaces/status-option.interface';
import { TimeSpanOption } from '../../../../shared/interfaces/time-span-option.interface';
import { StatusDesign } from '../../../../shared/enums/status-label-design.enum';
import { SummaryItem } from '../../../../shared/components/summary-card/summary-card.component';
import { DataGridColumnDef } from '../../../../shared/interfaces/data-grid-col-def.interface';
import { PaginationOptions } from '../../../../shared/interfaces/pagination-options.interface';
import { DateTimeService } from '../../../../shared/services/date-time.service';
import { ModalService } from '../../../../core/services/modal.service';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './orders.page.component.html',
  styleUrls: [
    '../../../../../styles/summary-page.scss',
    './orders.page.component.scss',
  ],
  providers: [
    {
      provide: StatusesService,
      useFactory: (config: StatusOption[]) => new StatusesService(config),
      deps: [STATUSES_CONFIG],
    },
    {
      provide: STATUSES_CONFIG,
      useValue: ORDER_STATUSES,
    },
  ],
})
export class OrdersPageComponent implements OnInit, OnDestroy {
  public relTimeSpans: TimeSpanOption[] = [];

  public statusDesign = StatusDesign;

  public modalSub?: Subscription;

  public ordersSummaryData: SummaryItem[] = [
    {
      label: 'All Orders',
      value: 450,
    },
    {
      label: 'Pending',
      value: 5,
    },
    {
      label: 'Completed',
      value: 320,
    },
    {
      label: 'Canceled',
      value: 30,
      progressInPercent: -20,
    },
    {
      label: 'Returned',
      value: 20,
    },
    {
      label: 'Damaged',
      value: 5,
    },
  ];

  public cartsSummaryData: SummaryItem[] = [
    {
      label: 'Abandoned Cart',
      valueInPercent: 20,
      progressInPercent: 0,
      redLabel: true,
    },
    {
      label: 'Customers',
      value: 30,
    },
  ];

  public orders = [
    {
      id: 0,
      customerName: 'Janet Adebayo',
      orderDate: '12 Aug 2022-12:25 am',
      orderType: 'Home Delivery',
      trackingID: '3051ik4p0',
      orderTotal: '₦25,000.00',
      action: 'completed',
      status: 'completed',
    },
    {
      id: 1,
      customerName: 'Samuel Johnson',
      orderDate: '12 Aug 2022-12:25 am',
      orderType: 'Home Delivery',
      trackingID: '9348fjr73',
      orderTotal: '₦35,000.00',
      action: 'inProgress',
      status: 'inProgress',
    },
    {
      id: 2,
      customerName: 'Francis Doe',
      orderDate: '12 Aug 2022-12:25 am',
      orderType: 'Home Delivery',
      trackingID: '02m38elwb',
      orderTotal: '₦48,000.00',
      action: 'pending',
      status: 'pending',
    },
  ];

  public orderTypes = [
    {
      label: 'Home Delivery',
      value: 'delivery',
    },
    {
      label: 'Pick Up',
      value: 'pickup',
    },
  ];

  public gridColumnDefs: DataGridColumnDef[] = [
    {
      field: 'customerName',
      displayName: 'Customer Name',
    },
    {
      field: 'orderDate',
      displayName: 'Order Date',
      filteredByDate: true,
    },
    {
      field: 'orderType',
      displayName: 'Order Type',
      filteredByOptions: {
        options: this.orderTypes,
        settings: {
          idPropKey: 'value',
          displayPropKey: 'label',
        },
      },
    },
    {
      field: 'trackingID',
      displayName: 'Tracking ID',
    },
    {
      field: 'orderTotal',
      displayName: 'OrderTotal',
      filteredByRange: true,
    },
    {
      field: 'status',
      displayName: 'Status',
      isStatusCol: true,
      statusColSettings: {
        statuses: ORDER_STATUSES,
        editable: true,
      },
      filteredByOptions: {
        options: ORDER_STATUSES,
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

  constructor(
    private dateTimeService: DateTimeService,
    private modalService: ModalService
  ) {}

  public createNewOrder(): void {
    this.modalSub = this.modalService
      .openModal(NewOrderModalComponent, {
        title: 'Create New Order',
      })
      .subscribe({
        complete: () => this.modalSub?.unsubscribe(),
        next: (value) => console.log(value),
      });
  }

  //---------- Lifecycle methods start ----------

  ngOnInit(): void {
    this.relTimeSpans = this.dateTimeService.createTimeSpanOptions(true);
  }

  ngOnDestroy(): void {
    this.modalSub?.unsubscribe();
  }

  //---------- Lifecycle methods end ----------
}
