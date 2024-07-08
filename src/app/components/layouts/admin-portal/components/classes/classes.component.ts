import { Component } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(private formBuilder: FormBuilder, private router: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  open(content: any) {
    this.modalService.open(content);
  }

  ngOnInit(): void {

    this.classes = new FormGroup({
      clsId: new FormControl('', [Validators.required]),
      clsName: new FormControl('', [Validators.required]),
      id: new FormControl(''),
    })

    this.clsEdit = new FormGroup({
      clsId: new FormControl('', [Validators.required]),
      clsName: new FormControl('', [Validators.required]),
    })

    let localClsData = localStorage.getItem('addClass');
    if (localClsData != null) {
      this.addClass = JSON.parse(localClsData);
    }
    // console.log(this.classes)
  }

  onSubmit() {
    // debugger
    if (this.addClass.find((x: any) => x.clsId == this.classes.controls.clsId.value)) {
      // this.modalService.dismissAll()
      this.toastr.error("This Id is already present in the system", 'Error', {
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      })
    }
    else {

      this.classes.get('id').setValue(Math.floor(100000 + Math.random() * 900000))
      this.addClass.push(this.classes.value);
      localStorage.setItem('addClass', JSON.stringify(this.addClass));
      this.modalService.dismissAll()
      this.toastr.success(`Class added`, 'Success', {
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      this.classes.reset();
    }
  }

  onEdit(content: any, item: any, index: any) {
    this.modalService.open(content)
    this.seletedIndex = index;
    this.selectedItem = item
    console.log(item);


    // console.log(this.selectedItem)
    this.clsEdit.patchValue({
      clsId: item.clsId,
      clsName: item.clsName,
    })
  }

  onSave() {
    this.addClass[this.seletedIndex] = this.clsEdit.value
    localStorage.setItem('addClass', JSON.stringify(this.addClass));

    this.modalService.dismissAll();

    this.toastr.info("Your data is updated", 'Info', {
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
      timeOut: 2000
    })

  }

  onOk() {
    if (this.confDelete === 'Delete') {
      this.addClass.splice(this.del_index, 1);
      this.modalService.dismissAll();
      this.toastr.error("Your data is removed from the system", "Note", {
        progressAnimation: 'increasing',
        progressBar: true,
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      })
      localStorage.setItem('addClass', JSON.stringify(this.addClass))
      this.confDelete = ''
    }

    else if (this.confDelete !== 'Delete' && this.confDelete !== '') {
      this.toastr.error("Wrong Input", "Note", {
        progressAnimation: 'increasing',
        progressBar: true,
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      })
    }

    else {
      this.toastr.info("Input required!", 'Info', {
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      })

    }
  }

  onDelete(content: any, index: any) {
    this.modalService.open(content, { centered: true })
    this.del_index = index
  }
}


