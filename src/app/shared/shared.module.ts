import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { SvgIconService } from './services/svg-icon.service';
import { DefaultInputComponent } from './components/default-input/default-input.component';
import { FilledStyleDirective } from './directives/filled-style.directive';
import { InnerLabelDirective } from './directives/inner-label.directive';

@NgModule({
  imports: [CommonModule],
  exports: [
    CommonModule,
    SvgIconComponent,
    DefaultInputComponent,
    InnerLabelDirective,
    FilledStyleDirective,
  ],
  declarations: [
    SvgIconComponent,
    DefaultInputComponent,
    InnerLabelDirective,
    FilledStyleDirective,
  ],
  providers: [SvgIconService],
})
export class SharedModule {}
