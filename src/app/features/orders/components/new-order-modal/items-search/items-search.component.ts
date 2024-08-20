import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import {
  animate,
  group,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FormControl } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModule } from '../../../../../shared/shared.module';
import { OrderLineData } from '../../../../../shared/components/order-line-control/order-line-control.component';
import { OrderLineContent } from '../../../../../shared/components/order-line/order-line.component';

@Component({
  selector: 'app-items-search',
  standalone: true,
  imports: [SharedModule, ScrollingModule],
  templateUrl: './items-search.component.html',
  styleUrl: './items-search.component.scss',
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
export class ItemsSearchComponent implements OnInit, OnDestroy {
  @Input()
  public maxVisibleOptNumber: number = 5;

  @Output() itemSelected = new EventEmitter<OrderLineData>();

  @HostListener('document:click', ['$event'])
  closeDropdown(event: PointerEvent): void {
    if (
      this.isDropdownOpen &&
      !this._element.nativeElement.contains(event.target)
    )
      this.isDropdownOpen = false;
  }

  public visibleOptNumber: number = 3;

  public availableItems: OrderLineContent[] = [];

  public searchControl: FormControl = new FormControl();

  public isDropdownOpen: boolean = false;

  private searchSub?: Subscription;

  constructor(private _element: ElementRef) {}

  public toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  public search(value: string): void {
    this.availableItems; // HTTP Request here
    requestAnimationFrame(
      () => (this.visibleOptNumber = this.availableItems.length || 1)
    );
  }

  public onSelect(item: OrderLineContent): void {
    this.isDropdownOpen = false;

    const orderLineData: OrderLineData = {
      itemId: 1,
      itemName: item.itemName,
      itemPrice: item.itemPrice,
      itemQuantity: item.itemQuantity || 1,
      imageUrl: item.imageUrl,
    };
    this.itemSelected.emit(orderLineData);
  }

  //---------- Lifecycle methods start ----------

  ngOnInit(): void {
    this.availableItems = [
      {
        itemName: 'Iphone 15 Pro',
        itemPrice: '$1199.00',
      },
      {
        itemName: 'Xiaomi 14',
        itemPrice: '$899.00',
      },
      {
        itemName: 'Samsung Galaxy S24',
        itemPrice: '$949.00',
      },
    ];

    this.searchSub = this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((term) => this.search(term));
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
  }

  //---------- Lifecycle methods end ----------
}
