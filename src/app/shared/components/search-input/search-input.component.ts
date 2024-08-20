import { Component, Input } from '@angular/core';
import { ControlBaseComponent } from '../control-base/control-base.component';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: [
    '../../styles/custom-control.scss',
    './search-input.component.scss',
  ],
})
export class SearchInputComponent extends ControlBaseComponent<string> {
  @Input()
  public id?: string;
  @Input()
  public placeholder: string = 'Search';
  @Input()
  public slimStyle: boolean = false;

  public onChange(event: Event): void {
    this.value = (<HTMLInputElement>event.target).value;
    this.changed(this.value);
  }

  //---------- Lifecycle methods start ----------

  override ngOnInit(): void {
    super.ngOnInit();

    if (!this.value) {
      this.value = '';
    }
  }

  //---------- Lifecycle methods end ----------
}
