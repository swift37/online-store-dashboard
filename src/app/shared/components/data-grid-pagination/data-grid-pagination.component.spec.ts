import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridPaginationComponent } from './data-grid-pagination.component';

describe('DataGridPaginationComponent', () => {
  let component: DataGridPaginationComponent;
  let fixture: ComponentFixture<DataGridPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataGridPaginationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataGridPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
