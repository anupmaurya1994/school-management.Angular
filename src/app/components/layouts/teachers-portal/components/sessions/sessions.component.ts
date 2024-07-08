import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { auto } from '@popperjs/core';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss'],
})


export class SessionsComponent {
  monthlyAttendance: any = []
  stuAttendance: any = '';
  // todayDate = moment().format("DD/MM/YYYY")

  model: NgbDateStruct | undefined;
  bsValue: any;
  filteredStd: any = []
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private acRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let localData = localStorage.getItem('studentData');
    if (localData != null) {
      this.stuAttendance = JSON.parse(localData);
    }


    let clsID = this.acRoute.snapshot.params['classID']

    this.filteredStd = this.stuAttendance.filter((x: any) => x[4] == clsID)
    console.log(this.filteredStd);



    let monthlyAttendance = localStorage.getItem('studentAttendance')
    if (monthlyAttendance != null) {
      this.monthlyAttendance = JSON.parse(monthlyAttendance)
    }
  }

  fillAdsent(item: any, i: number, atds: string) {
    console.log(item);

    if (item[5].trim() == '') {
      item[5] = atds == 'P' ? 'P' : 'A';
    } else if (item[5].trim() == 'P') {
      item[5] = 'A';
    } else if (item[5].trim() == 'A') {
      item[5] = 'P';
    }
    this.stuAttendance[i] = item;
    localStorage.setItem("studentData", JSON.stringify(this.stuAttendance))
  }

  onSubmit() {
    // let data = this.stuAttendance.filter((x: any) => {
    //   return x[5];
    // })
    // console.log(data);

    console.log(this.model);
    let obj = this.stuAttendance.map((x: any) => {
      return {
        student_name: x[0] + ' ' + x[1],
        absent: x[5].trim() == 'A' ? true : false,
        present: x[5].trim() == 'P' ? true : false,
      };
    });

    let AbsentStudent = {
      date: moment(this.bsValue).format("DD/MM/YYYY"),
      students: obj,
    };
    console.log(AbsentStudent);

    this.monthlyAttendance.push(AbsentStudent)

    console.log(AbsentStudent);
    localStorage.setItem('studentAttendance', JSON.stringify(this.monthlyAttendance));
  }


}
