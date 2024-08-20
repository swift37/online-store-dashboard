import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFiltersPopupComponent } from './date-filters-popup.component';

describe('DateFiltersPopupComponent', () => {
  let component: DateFiltersPopupComponent;
  let fixture: ComponentFixture<DateFiltersPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateFiltersPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DateFiltersPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
