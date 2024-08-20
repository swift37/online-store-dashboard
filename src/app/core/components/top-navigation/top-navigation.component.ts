import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { ROUTE_DATA_BREADCRUMB } from '../../constants/routing';

export interface RouteLevel {
  label: string;
  url: string;
}

@Component({
  selector: 'app-top-navigation',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './top-navigation.component.html',
  styleUrl: './top-navigation.component.scss',
})
export class TopNavigationComponent implements OnInit, OnDestroy {
  public routeLevels: RouteLevel[] = [];

  private routerSub?: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: RouteLevel[] = []
  ): RouteLevel[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label: string = child.snapshot.data[ROUTE_DATA_BREADCRUMB];
      if (label) {
        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  //---------- Lifecycle methods start ----------

  ngOnInit(): void {
    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(
        () =>
          (this.routeLevels = this.createBreadcrumbs(this.activatedRoute.root))
      );
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  //---------- Lifecycle methods end ----------
}
