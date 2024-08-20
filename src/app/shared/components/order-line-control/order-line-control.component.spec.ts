import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLineControlComponent } from './order-line-control.component';

describe('OrderLineControlComponent', () => {
  let component: OrderLineControlComponent;
  let fixture: ComponentFixture<OrderLineControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderLineControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderLineControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
