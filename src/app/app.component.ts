import {
  Component,
  Inject,
  InjectionToken,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { TopNavigationComponent } from './core/components/top-navigation/top-navigation.component';
import { Store } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';
import { authActions } from './core/auth/store/auth.actions';
import {
  selectCurrentUser,
  selectLoading,
} from './core/auth/store/auth.reducer';
import { combineLatest } from 'rxjs';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SharedModule,
    RouterOutlet,
    SidebarComponent,
    TopNavigationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public data$ = combineLatest({
    loading: this.store.select(selectLoading),
    currentUser: this.store.select(selectCurrentUser),
  });

  constructor(
    @Inject(PLATFORM_ID) private platformId: InjectionToken<Object>,
    private store: Store
  ) {}

  //---------- Lifecycle methods start ----------

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(authActions.fetchUser());
    }
  }

  //---------- Lifecycle methods end ----------
}
