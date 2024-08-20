import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { OrderLineContent } from '../../../../shared/components/order-line/order-line.component';

@Component({
  selector: 'app-recent-orders',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './recent-orders.component.html',
  styleUrl: './recent-orders.component.scss',
})
export class RecentOrdersComponent {
  @Input()
  public orders?: OrderLineContent[];
}
