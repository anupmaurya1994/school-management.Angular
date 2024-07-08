import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.scss']
})
export class AdminPortalComponent {
  isHeader: boolean = true
  constructor(private route: Router) {
    route.events.subscribe((v) => {
      if (v instanceof NavigationEnd) {
        if (v.url == '/admin/profile') {
          this.isHeader = false
        } else {
          this.isHeader = true;
        }

      }
    })
  }
}
