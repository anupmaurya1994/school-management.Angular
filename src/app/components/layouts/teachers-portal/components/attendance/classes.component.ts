import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent {
  classes: any = {}
  clsEdit: any = {}
  addClass: any = []
  selectedItem: any = {}
  seletedIndex: any = null;
  confDelete: string = ''
  del_index: number = 0;
  LogInUser: any = '';
  attendance: any = []
  present: number = 0
  absent: number = 0

  constructor(private formBuilder: FormBuilder, private acRoute: ActivatedRoute, private router: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  currentSection: string = 'home';
  showSection(section: string) {
    this.currentSection = section;
  }

  ngOnInit(): void {

    this.card()
    this.stuAttendance()

  }

  card() {
    this.LogInUser = JSON.parse(localStorage.getItem('LogInUser') || '');


    let data: any = localStorage.getItem('newStaff');
    if (data != null) {
      data = JSON.parse(data);
    }
    console.log(data);

    let classList = data.find((x: any) => {
      // return x.email.toLowerCase().includes(this.d.toLowerCase())
      return x.email == this.LogInUser.email;
    });

    this.classes = classList.std;
    console.log(this.classes);

  }

  stuAttendance() {
    this.attendance = localStorage.getItem('studentAttendance');

    if (this.attendance != null) {
      this.attendance = JSON.parse(this.attendance)
    }
    console.log(this.attendance.students);

    let presentStu = this.attendance[0].students.filter((x: any) => x.present == true)
    console.log(presentStu);
    this.present = presentStu.length;
    this.absent = this.attendance[0].students.length - this.present
  }



}


