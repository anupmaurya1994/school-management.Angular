import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  changepass: any = {}

  constructor(private router: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.changepass = new FormGroup({
      oldPass: new FormControl('', [Validators.required, Validators.email]),
      newPass: new FormControl('', [Validators.required]),
      confPass: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  currentSection: string = 'overview';
  showSection(section: string) {
    this.currentSection = section;
  }

  passIcon = "bi bi-eye-fill"
  showPas(inputId: string, iconId: string) {
    var input = document.getElementById(inputId) as HTMLInputElement
    var icon = document.getElementById(iconId) as HTMLInputElement

    if (input != null && input.type == "password") {
      input.type = "text";
      icon.setAttribute('class', 'bi-eye-slash-fill')
    }
    else {
      input.type = "password";
      icon.setAttribute('class', 'bi-eye-fill')
    }
  }

}
