import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  newUsers: any[] = []

  registerForm: any = {}

  // submitted = false  //not in use

  constructor(private formBuilder: FormBuilder, private router: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
      role: new FormControl('', [Validators.required]),
      id: new FormControl(Math.floor(100000 + Math.random() * 900000))
    })


    console.log(this.registerForm)

    let localData = localStorage.getItem('newUsers');
    if (localData != null) {
      this.newUsers = JSON.parse(localData) || [];
    }

  }
  get regData() {
    return this.registerForm.controls
  }

  onSubmit() {
    // this.submitted = true; // not in use

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched()
      this.toastr.info('Please Fill all required feilds !', 'Error', {
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      return false
    }
    else {
      this.registerForm.get('id').setValue(Math.floor(100000 + Math.random() * 900000))
      this.newUsers.push(this.registerForm.value);
      console.log(this.newUsers);

      localStorage.setItem('newUsers', JSON.stringify(this.newUsers));
      this.toastr.success('Your account is Created Successfully!', 'Success', {
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      this.router.navigate(['/'])
      return true
    }
  }
}
