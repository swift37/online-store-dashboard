import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordInputErrorsComponent } from './password-input-errors.component';

describe('PasswordInputErrorsComponent', () => {
  let component: PasswordInputErrorsComponent;
  let fixture: ComponentFixture<PasswordInputErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordInputErrorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordInputErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
