import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrl: './tab-group.component.scss',
})
export class TabGroupComponent implements OnChanges, AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
  public activeTab!: TabComponent;

  @Input()
  public activeTabIndex: number = 0;
  @Input()
  public type: 'indicator' | 'tab-group' = 'tab-group';
  @Input()
  public iconStyle: string = 'light';
  @Input()
  public iconPosition: 'left' | 'right' = 'left';
  @Input()
  public filledStyle: boolean = false;

  public activateTab(tab?: TabComponent): void {
    this.activeTab = tab || this.tabs.first;
  }

  //---------- Lifecycle methods start ----------

  ngAfterContentInit() {
    this.activateTab(this.tabs.get(this.activeTabIndex));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeTabIndex'] && !changes['activeTabIndex'].firstChange) {
      this.activateTab(this.tabs.get(this.activeTabIndex));
    }
  }

  //---------- Lifecycle methods end ----------
}
