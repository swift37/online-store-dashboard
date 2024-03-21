import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFilledStyle]',
})
export class FilledStyleDirective implements AfterViewInit {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.addClass(
      this.element.nativeElement.querySelector('.custom-control'),
      'filled-style'
    );
  }
}
