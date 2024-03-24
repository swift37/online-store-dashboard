import { Component, DebugElement } from '@angular/core';
import { FilledStyleDirective } from './filled-style.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../shared.module';

@Component({
  standalone: true,
  template: `<div class="test-div">
    <app-default-input
      id="testId"
      label="Label"
      appFilledStyle
    ></app-default-input>
  </div>`,
  imports: [SharedModule],
})
class TestComponent {}

describe('FilledStyleDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    des = fixture.debugElement.query(By.directive(FilledStyleDirective));
  });

  it('should have an element with the filled style', () => {
    expect(des).toBeTruthy();
  });

  it('the "custom-control" div should have the "filled-style" class', () => {
    const customControl = des.nativeElement.querySelector('.custom-control');
    const classList = customControl?.classList;
    expect(classList.contains('filled-style')).toBeTrue();
  });

  it('the input should have the background color "rgba(233, 236, 248, 0.9)"', () => {
    const customControl = des.nativeElement.querySelector('input');
    const bgColor = window.getComputedStyle(
      customControl,
      null
    ).backgroundColor;
    expect(bgColor).toBe('rgba(233, 236, 248, 0.9)');
  });

  it('the input should have a no border', () => {
    const customControl = des.nativeElement.querySelector('input');
    const border = window.getComputedStyle(customControl, null).border;
    expect(border).toContain('none');
  });
});
