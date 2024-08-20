import { Status } from '../../interfaces/status.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlBaseComponent } from '../control-base/control-base.component';

export interface OrderLineContent {
  itemName: string;
  itemPrice: string;
  itemQuantity?: number;
  imageUrl?: string;
  date?: Date;
  status?: Status;
}

@Component({
  selector: 'app-order-line',
  templateUrl: './order-line.component.html',
  styleUrl: './order-line.component.scss',
})
export class OrderLineComponent implements OnInit {
  @Input()
  public content!: OrderLineContent;
  @Input()
  public type: 'order' | 'add-item' = 'order';

  @Output() added = new EventEmitter<void>();
  @Output() quantityChanged = new EventEmitter<number>();

  public formedDate?: string;

  public addItem(): void {
    this.added.emit();
  }

  //---------- Lifecycle methods start ----------

  ngOnInit(): void {
    if (this.type == 'order') {
      if (!this.content.date || !this.content.status) {
        console.error(
          "For the 'order' type, the 'date' and 'status' content fields must be assigned."
        );
      }

      this.formedDate = this.content.date?.toUTCString().slice(5, 16);
    }

    if (this.type == 'order' && !this.content.itemQuantity) {
      this.content.itemQuantity = 1;
    }
  }

  //---------- Lifecycle methods end ----------
}
