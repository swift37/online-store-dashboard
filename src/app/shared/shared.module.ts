import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { SvgIconService } from './services/svg-icon.service';
import { DefaultInputComponent } from './components/default-input/default-input.component';

@NgModule({
  imports: [CommonModule],
  exports: [CommonModule, SvgIconComponent, DefaultInputComponent],
  declarations: [SvgIconComponent, DefaultInputComponent],
  providers: [SvgIconService],
})
export class SharedModule {}
