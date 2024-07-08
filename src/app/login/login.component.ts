import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  newUsers: any[] = []

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  loginData = {
    username: '',
    pass: '',
  }
  localData: any;

  constructor(private router: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
    let localData = localStorage.getItem('newUsers');
    if (localData != null) {
      this.newUsers = JSON.parse(localData);
    }
  }

  get logData() {
    return this.loginForm.controls
  }

  passIcon = "bi bi-eye-fill"
  showPas() {
    var input = document.getElementById('pass') as HTMLInputElement;
    if (input != null && input.type == "password") {
      input.type = "text";
      this.passIcon = 'bi bi-eye-slash-fill'
    }
    else {
      input.type = "password";
      this.passIcon = 'bi bi-eye-fill'
    }
  }

  onLogin() {

    console.log('sidhuoghjrpgo');

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastr.info('Please Fill all required feilds !', 'Error', {
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      return false
    }

    else {
      const isUserExist = this.newUsers.find((u: any) => (u.username == this.loginForm.controls.username.value && u.pass == this.loginForm.controls.pass.value));

      console.log(isUserExist)
      if (isUserExist != undefined) {
        let a = Math.random();
        localStorage.setItem('userId', JSON.stringify(a));
        localStorage.setItem("LogInUser", JSON.stringify(isUserExist))
        this.toastr.success('You have Login Successfully!', 'Success', {
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
        if (isUserExist.role == "Admin") {
          this.router.navigate(['admin/dashboard'])
        } else if (isUserExist.role == "teachers") {
          this.router.navigate(['teachers/dashboard'])
        }
      }
      else {
        this.toastr.error('Wrong credentials.', 'Error', {
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    }
    return true
  }

}
