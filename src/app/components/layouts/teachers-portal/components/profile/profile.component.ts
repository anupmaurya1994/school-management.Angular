import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  changepass: any = {}
  modalRef?: BsModalRef;
  imgInput: any;
  filePayload: any;
  eImg: any;
  profImg: any;
  logInUser: any = {};
  usersList: any = [];
  checkingMsg: any = ''
  oldPassCheck: any = ''
  time: any = '';
  phNum: number = Math.floor(1000000000 + Math.random() * 9000000000);

  constructor(private router: Router, private modalService: BsModalService, private toastr: ToastrService,) { }

  ngOnInit(): void {

    this.logInUser = JSON.parse(localStorage.getItem('LogInUser') || '');
    console.log(this.logInUser);

    this.usersList = JSON.parse(localStorage.getItem('newUsers') || '');
    console.log(this.usersList);


    this.changepass = new FormGroup({
      oldPass: new FormControl('', [Validators.required, Validators.email]),
      newPass: new FormControl('', [Validators.required]),
      confPass: new FormControl('', [Validators.required, Validators.minLength(8)])
    })

    this.profImg = localStorage.getItem('profileImg');
    this.imgInput = document.querySelector("#previewImg") as HTMLImageElement;
    this.imgInput.src = this.profImg

    let profileImg1 = document.getElementById('profileImg1') as HTMLImageElement;
    profileImg1.src = this.profImg || ""

    setInterval(() => {
      // let t = document.getElementById('time') as HTMLDivElement;
      this.time = moment().format('hh:mm:ss A')
    }, 1)

  }

  currentSection: string = 'overview';
  showSection(section: string) {
    this.currentSection = section;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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

  onChangefile(event: any) {

    if (window.FileReader) {
      this.handleReaderLoad(event.target.files[0]);
    }
    else {
      alert('FileReader are not supported in this browser.');
    }
  }

  handleReaderLoad(imgToEdit: File) {

    var reader = new FileReader();
    reader.readAsDataURL(imgToEdit);
    reader.onload = (e: any) => {
      const filePayload = e.target.result
      // this.imgInput = document.querySelector("#previewImg") as HTMLImageElement;

      this.imgInput.src = filePayload
      this.filePayload = filePayload
    }
  }

  onCancle() {
    // this.profImg = localStorage.getItem('profileImg');
    this.imgInput = document.querySelector("#previewImg") as HTMLImageElement;
    this.imgInput.src = this.profImg
  }

  onSave() {
    localStorage.setItem('profileImg', this.filePayload);
    this.profImg = localStorage.getItem('profileImg');
    let profileImg1 = document.getElementById('profileImg1') as HTMLImageElement;
    profileImg1.src = this.profImg || ""
  }

  onSaveChanges() {
    if (this.changepass.controls.oldPass.value == this.logInUser.pass) {
      if (this.changepass.controls.newPass.value == this.changepass.controls.confPass.value) {
        this.logInUser.pass = this.changepass.controls.newPass.value
      }
      console.log(this.logInUser);

    }

    this.usersList = this.usersList.filter((x: any) => {
      return x.email == this.logInUser.email ? x.pass = this.logInUser.pass : x.pass
    })
    console.log(this.usersList);

    localStorage.setItem('newUsers', JSON.stringify(this.usersList))
    localStorage.removeItem("LogInUser");
    this.router.navigate(['/'])
    this.toastr.success('Your password has changed successfully!', 'Success', {
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
      timeOut: 2000,
    })


  }

  logOut() {
    localStorage.removeItem('LogInUser');
    this.router.navigate(['/'])
  }

  checkPass() {
    if (this.changepass.controls.newPass.value != this.changepass.controls.confPass.value) {
      this.checkingMsg = "New password and confirm password doesn't match"
    }
    else {
      this.checkingMsg = ''
    }
  }

  checkOldPass() {
    if (this.changepass.controls.oldPass.value != this.logInUser.pass) {
      this.oldPassCheck = "Your old password doesn't match"
    }
    else {
      this.oldPassCheck = ''
    }
  }
}
