import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewCustomerModalComponent } from '../../components/new-customer-modal/new-customer-modal.component';
import { RouterModule } from '@angular/router';
import { CUSTOMER_STATUSES } from '../../constants/statuses.const';
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
import { ModalService } from '../../../../core/services/modal.service';

@Component({
  selector: 'app-customers-page',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './customers.page.component.html',
  styleUrls: [
    '../../../../../styles/summary-page.scss',
    './customers.page.component.scss',
  ],
  providers: [
    {
      provide: StatusesService,
      useFactory: (config: StatusOption[]) => new StatusesService(config),
      deps: [STATUSES_CONFIG],
    },
    {
      provide: STATUSES_CONFIG,
      useValue: CUSTOMER_STATUSES,
    },
  ],
})
export class CustomersPageComponent {
  public relTimeSpans: TimeSpanOption[] = [];

  public statusDesign = StatusDesign;

  public customersSummaryData: SummaryItem[] = [
    {
      label: 'All Customers',
      value: 1250,
      progressInPercent: 15.8,
    },
    {
      label: 'Active',
      value: 1180,
      progressInPercent: 85,
    },
    {
      label: 'In-Active',
      value: 70,
      progressInPercent: -10,
    },
    {
      label: 'New Customers',
      value: 30,
      progressInPercent: -20,
    },
    {
      label: 'Purchasing',
      value: 657,
    },
    {
      label: 'Abandoned Carts',
      value: 5,
    },
  ];

  public customers = [
    {
      id: 0,
      customerName: 'Janet Adebayo',
      email: 'janet.a@online.store',
      phone: '+2348065650633',
      orders: 3,
      ordersTotal: '₦251,000.00',
      sinceDate: '21 Feb 2024-12:25 am',
      status: 'active',
    },
    {
      id: 1,
      customerName: 'Samuel Johnson',
      email: 'samuel.jsn@online.store',
      phone: '+2348065650633',
      orders: 5,
      ordersTotal: '₦355,000.00',
      sinceDate: '30 Jan 2023-12:25 am',
      status: 'active',
    },
    {
      id: 2,
      customerName: 'Francis Doe',
      email: 'francis.doe@online.store',
      phone: '+2348065650633',
      orders: 8,
      ordersTotal: '₦488,000.00',
      sinceDate: '11 Mar 2022-12:25 am',
      status: 'inActive',
    },
  ];

  public gridColumnDefs: DataGridColumnDef[] = [
    {
      field: 'customerName',
      displayName: 'Customer Name',
    },
    {
      field: 'email',
      displayName: 'Email',
    },
    {
      field: 'phone',
      displayName: 'Phone',
    },
    {
      field: 'orders',
      displayName: 'Orders',
      filteredByRange: true,
    },
    {
      field: 'ordersTotal',
      displayName: 'Orders Total',
      filteredByRange: true,
    },
    {
      field: 'sinceDate',
      displayName: 'Customer Since',
      filteredByDate: true,
    },
    {
      field: 'status',
      displayName: 'Status',
      isStatusCol: true,
      statusColSettings: {
        statuses: CUSTOMER_STATUSES,
        editable: false,
      },
      filteredByOptions: {
        options: CUSTOMER_STATUSES,
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

  public modalSub?: Subscription;

  constructor(
    private dateTimeService: DateTimeService,
    private modalService: ModalService
  ) {}

  public addNewCustomer(): void {
    this.modalSub = this.modalService
      .openModal(NewCustomerModalComponent, {
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
