import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-tab',
  template: '',
})
export class TabComponent {
  @Input({ required: true })
  public label!: string;
  @Input()
  public iconName?: string;
  @Input()
  public templateRef: TemplateRef<any> | null = null;
}
