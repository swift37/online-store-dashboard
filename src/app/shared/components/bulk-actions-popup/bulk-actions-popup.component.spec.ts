import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridBulkActionComponent } from './bulk-actions-popup.component';

describe('GridBulkActionComponent', () => {
  let component: GridBulkActionComponent;
  let fixture: ComponentFixture<GridBulkActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridBulkActionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GridBulkActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
