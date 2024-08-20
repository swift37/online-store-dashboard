import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlBaseComponent } from '../control-base/control-base.component';

export interface OrderLineData {
  itemId: number;
  itemName: string;
  itemPrice: string;
  itemQuantity: number;
  imageUrl?: string;
}

@Component({
  selector: 'app-order-line-control',
  templateUrl: './order-line-control.component.html',
  styleUrl: './order-line-control.component.scss',
})
export class OrderLineControlComponent
  extends ControlBaseComponent<OrderLineData>
  implements OnInit
{
  public override value!: OrderLineData;

  @Output() removed = new EventEmitter<void>();

  public removeItem(): void {
    this.removed.emit();
  }

  public onIncrease(): void {
    if (!this.disabled && this.value?.itemQuantity) {
      this.markAsTouched();

      ++this.value.itemQuantity;
      this.changed(this.value);
    }
  }

  public onDecrease(): void {
    if (
      !this.disabled &&
      this.value?.itemQuantity &&
      this.value.itemQuantity > 1
    ) {
      this.markAsTouched();

      --this.value.itemQuantity;
      this.changed(this.value);
    }
  }

  //---------- Lifecycle methods start ----------

  override ngOnInit(): void {
    super.ngOnInit();

    if (!this.value) {
      console.error('Value must be assigned in advance');
    }
  }

  //---------- Lifecycle methods end ----------
}
