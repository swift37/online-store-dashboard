import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-view-item',
  standalone: true,
  imports: [],
  templateUrl: './view-item.component.html',
  styleUrl: './view-item.component.scss',
})
export class ViewItemComponent implements OnInit {
  public item: any;

  constructor(private route: ActivatedRoute) {}

  //---------- Lifecycle methods start ----------

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.item = data['item'];
    });
  }

  //---------- Lifecycle methods end ----------
}
