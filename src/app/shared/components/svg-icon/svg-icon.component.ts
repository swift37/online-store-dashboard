import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { SvgIconService } from '../../services/svg-icon.service';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-svg-icon',
  styleUrl: './svg-icon.component.scss',
  template: `<span [innerHTML]="sanitizedSvgContent"></span>`,
})
export class SvgIconComponent implements OnInit {
  @Input() public iconName?: string;
  @Input() public iconStyle?: string;

  public sanitizedSvgContent?: SafeHtml;

  constructor(
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private svgIconService: SvgIconService
  ) {}

  public ngOnInit(): void {
    this.loadSvg();
  }

  private loadSvg(): void {
    // Exit from the method in case of icon absence
    if (!this.iconName) return;
    // Construct your path to an icon
    const svgPath = `../../../../assets/icons/svg/${this.iconStyle}/${this.iconName}.svg`;

    // Check if the icon is already cached
    if (!this.svgIconService.svgIconMap.has(svgPath)) {
      // *4
      const svg$ = this.http.get(svgPath, { responseType: 'text' }).pipe(
        map((svg) => this.sanitizer.bypassSecurityTrustHtml(svg)),
        shareReplay(1)
      );

      // Cache the result: iconName as a key and Observable as a value
      this.svgIconService.svgIconMap.set(svgPath, svg$);
    }

    // Get an Observable with sanitized SVG from the Map
    const cachedSvg$: Observable<SafeHtml> | undefined =
      this.svgIconService.svgIconMap.get(svgPath);

    // Subscribe to the Observable to get the content
    cachedSvg$?.subscribe({
      next: (svg) => {
        // Set it to the property
        this.sanitizedSvgContent = svg;
        // Trigger the 'detectChanges' method for UI updating
        this.cdr.detectChanges();
      },
      // Simple error handling in case of any issue related to icon loading
      error: (error) => console.error(`Error loading SVG`, error),
    });
  }
}
