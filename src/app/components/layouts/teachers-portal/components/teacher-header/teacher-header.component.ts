import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teacher-header',
  templateUrl: './teacher-header.component.html',
  styleUrls: ['./teacher-header.component.scss']
})
export class TeacherHeaderComponent {

  time: any = ''
  logInUser: any = {}
  constructor(
    private formBuilder: FormBuilder, private router: Router, private modalService: NgbModal, private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    setInterval(() => {
      // let t = document.getElementById('time') as HTMLDivElement;
      this.time = moment().format('hh:mm:ss A')
    }, 300)

    this.logInUser = JSON.parse(localStorage.getItem('LogInUser') || '')
  }

  logOut() {
    localStorage.removeItem('LogInUser');
    this.router.navigate(['/'])
  }


}
