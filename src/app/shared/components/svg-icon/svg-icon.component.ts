import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { SvgIconService } from '../../services/svg-icon.service';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-svg-icon',
  styleUrl: './svg-icon.component.scss',
  template: `<span [innerHTML]="sanitizedSvgContent"></span>`,
})
export class SvgIconComponent implements OnChanges {
  @Input({ required: true })
  public iconName!: string;
  @Input()
  public iconStyle?: string;

  public sanitizedSvgContent?: SafeHtml;

  constructor(
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private svgIconService: SvgIconService
  ) {}

  private loadSvg(): void {
    // Construct your path to an icon
    const stylePath: string = this.iconStyle ? this.iconStyle + '/' : '';
    const svgPath =
      `../../../../assets/icons/svg/${stylePath}` + `${this.iconName}.svg`;

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

  //---------- Lifecycle methods start ----------

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['iconName']?.currentValue != changes['iconName']?.previousValue ||
      changes['iconStyle']?.currentValue != changes['iconStyle']?.previousValue
    )
      this.loadSvg();
  }

  //---------- Lifecycle methods end ----------
}
