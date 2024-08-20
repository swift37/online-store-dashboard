import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniSelectComponent } from './mini-select.component';

describe('MiniSelectComponent', () => {
  let component: MiniSelectComponent;
  let fixture: ComponentFixture<MiniSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiniSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
