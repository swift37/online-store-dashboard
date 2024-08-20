import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
})
export class EmptyStateComponent {
  @Input({ required: true })
  public title!: string;

  @Input({ required: true })
  public subtitle!: string;

  @Input({ required: true })
  public iconName!: string;

  @Input({ required: true })
  public iconStyle!: string;
}
