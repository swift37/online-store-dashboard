import {
  animate,
  group,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.scss',
  animations: [
    trigger('modal', [
      transition('hidden => displayed', [
        style({
          height: 0,
          overflow: 'hidden',
        }),
        group([
          animate(300, style({ height: '*' })),
          animate(600, style({ overflow: 'visible' })),
        ]),
      ]),
      transition('displayed => hidden', [
        style({
          overflow: 'hidden',
        }),
        animate(
          300,
          style({
            height: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class ModalContainerComponent implements AfterViewInit {
  @Input() title?: string;

  @Output() closed = new EventEmitter<void>();

  public containerState: 'displayed' | 'hidden' = 'hidden';

  public triggerOutAnimation(): void {
    this.containerState = 'hidden';
  }

  public onClose(): void {
    if (this.containerState == 'hidden') {
      this.closed.emit();
    }
  }

  //---------- Lifecycle methods start ----------

  ngAfterViewInit(): void {
    this.containerState = 'displayed';
  }

  //---------- Lifecycle methods end ----------
}
