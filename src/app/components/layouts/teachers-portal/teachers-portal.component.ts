import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-teachers-portal',
  templateUrl: './teachers-portal.component.html',
  styleUrls: ['./teachers-portal.component.scss']
})
export class TeachersPortalComponent {
  isHeader: boolean = true
  constructor(private route: Router) {
    route.events.subscribe((v) => {
      if (v instanceof NavigationEnd) {
        if (v.url == '/teachers/profile') {
          this.isHeader = false
        }
        else {
          this.isHeader = true
        }
      }
    })
  }

  ngOnInit() {
    if (localStorage.getItem("LogInUser") == null) {
      this.route.navigate(['/']);
    }
  }
}
