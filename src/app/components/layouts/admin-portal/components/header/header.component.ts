import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input()
  path: string = '';
  // isDisplay: boolean = true;
  // ngAfterViewChecked() {
  //   console.log(this.path);
  //   if (this.path == '/profile') {
  //     this.isDisplay = false;
  //   } else {
  //     this.isDisplay = true;
  //   }
  // }
}
