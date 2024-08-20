import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridControlsComponent } from './data-grid-controls.component';

describe('DataGridControlsComponent', () => {
  let component: DataGridControlsComponent;
  let fixture: ComponentFixture<DataGridControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataGridControlsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataGridControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
