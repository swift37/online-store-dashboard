import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInnerLabel]',
})
export class InnerLabelDirective implements AfterViewInit {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.addClass(
      this.element.nativeElement.querySelector('.custom-control'),
      'inner-label'
    );
  }
}
