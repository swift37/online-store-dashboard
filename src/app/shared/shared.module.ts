import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { SvgIconService } from './services/svg-icon.service';

@NgModule({
  imports: [CommonModule],
  exports: [CommonModule, SvgIconComponent],
  declarations: [SvgIconComponent],
  providers: [SvgIconService],
})
export class SharedModule {}
