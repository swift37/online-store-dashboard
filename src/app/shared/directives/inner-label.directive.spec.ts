import { Component, DebugElement } from '@angular/core';
import { InnerLabelDirective } from './inner-label.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../shared.module';

@Component({
  standalone: true,
  template: `<div class="test-div">
    <app-default-input
      id="testId"
      label="Label"
      appInnerLabel
    ></app-default-input>
  </div>`,
  imports: [SharedModule],
})
class TestComponent {}

describe('InnerLabelDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    des = fixture.debugElement.query(By.directive(InnerLabelDirective));
  });

  it('should have an element with the inner label', () => {
    expect(des).toBeTruthy();
  });

  it('the "custom-control" div should have the "inner-label" class', () => {
    const customControl = des.nativeElement.querySelector('.custom-control');
    const classList = customControl?.classList;
    expect(classList.contains('inner-label')).toBeTrue();
  });

  it('the "custom-control" container should have a height of 58px', () => {
    const container = des.nativeElement.querySelector(
      '.custom-control__container'
    );
    const height = window.getComputedStyle(container, null).height;
    expect(height).toBe('58px');
  });

  it('the label should be in an absolute position', () => {
    const label = des.nativeElement.querySelector('label');
    const border = window.getComputedStyle(label, null).position;
    expect(border).toBe('absolute');
  });
});
