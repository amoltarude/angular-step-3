import { Component } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNoteView = false;

  constructor(private routerservice: RouterService) {
    this.isNoteView = true;
  }

  test() {
    this.isNoteView = !this.isNoteView;
    if (this.isNoteView) {
      this.routerservice.routeToNoteView();
    } else {
      this.routerservice.routeToListView();
    }
  }
}
