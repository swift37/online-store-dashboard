import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SvgIconComponent } from './svg-icon.component';
import { SvgIconService } from '../../services/svg-icon.service';
import { SharedModule } from '../../shared.module';
import { HttpClientModule } from '@angular/common/http';

describe('SvgIconComponent', () => {
  let component: SvgIconComponent;
  let fixture: ComponentFixture<SvgIconComponent>;
  let svgIconService: SvgIconService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SvgIconComponent);
    component = fixture.componentInstance;
    svgIconService = fixture.debugElement.injector.get(SvgIconService);
    component.iconName = 'activity';
    component.iconStyle = 'bold';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render svg', waitForAsync(() => {
    fixture.whenStable().then(() => {
      let compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('svg')).toBeTruthy();
    });
  }));
});
