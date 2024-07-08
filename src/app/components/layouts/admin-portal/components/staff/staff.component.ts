import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})

export class StaffComponent {
  newStaff: any[] = []
  selectedItems: any = []
  actUser: any[] = [];
  seletedIndex: number = 0;
  dropdownList: any = [];
  dropdownSettings: IDropdownSettings = {};
  del_index: number = 0;
  confDelete: string = ''
  editStaffData: any = ""
  staffData: any = {}




  constructor(private formBuilder: FormBuilder, private router: Router, private modalService: NgbModal, private toastr: ToastrService) {
    this.staffData = new FormGroup({
      fstName: new FormControl('', [Validators.required]),
      lstName: new FormControl('', [Validators.required]),
      phNum: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
      role: new FormControl('', [Validators.required]),
      std: new FormControl('', [Validators.required]),
      status: new FormControl('active'),
      id: new FormControl(''),
    });

    this.editStaffData = new FormGroup({
      fstName: new FormControl('', [Validators.required]),
      lstName: new FormControl('', [Validators.required]),
      phNum: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
      role: new FormControl('', [Validators.required]),
      std: new FormControl('', [Validators.required]),
      status: new FormControl('active')
    })
  }

  ngOnInit(): void {

    let localStfData = localStorage.getItem('newStaff');
    if (localStfData != null) {
      this.newStaff = JSON.parse(localStfData);
    }
    // console.log(this.newStaff)
    this.dropdownList = [
      { item_id: 1, item_text: 'Std-1' },
      { item_id: 2, item_text: 'Std-2' },
      { item_id: 3, item_text: 'Std-3' },
      { item_id: 4, item_text: 'Std-4' },
      { item_id: 5, item_text: 'Std-5' },
      { item_id: 6, item_text: 'Std-6' },
      { item_id: 7, item_text: 'Std-7' },
      { item_id: 8, item_text: 'Std-8' },
      { item_id: 9, item_text: 'Std-9' },
      { item_id: 10, item_text: 'Std-10' },
      { item_id: 11, item_text: 'Std-11' },
      { item_id: 12, item_text: 'Std-12' },
    ];

    this.selectedItems = [
      // { item_id: 3, item_text: '' },
      // { item_id: 4, item_text: '' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };

  }

  showStatus(item: any, status: string, index: number) {
    item.status = status
    this.newStaff[index] = item
  }


  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  open(content: any) {
    this.modalService.open(content);
    this.staffData.reset();
  }

  get stfData() {
    return this.staffData.controls
  }

  onSubmit() {
    if (this.staffData.invalid) {
      this.staffData.markAllAsTouched();
      this.toastr.info("Input required!", 'Info', {
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      })
      // this.staffData.reset();
    }

    else {
      this.staffData.get('id').setValue(Math.floor(100000 + Math.random() * 900000))
      this.newStaff.push(this.staffData.value);
      localStorage.setItem('newStaff', JSON.stringify(this.newStaff));
      this.modalService.dismissAll()
      this.toastr.success(`Welcome ${this.stfData.fstName.value}`, 'Success', {
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      this.staffData.reset();
    }
  }

  onEdit(content: any, item: any, index: number) {
    this.seletedIndex = index;
    this.modalService.open(content)
    this.staffData.reset();

    // console.log(this.selectedItem)
    this.editStaffData.patchValue({
      fstName: item.fstName,
      lstName: item.lstName,
      phNum: item.phNum,
      email: item.email,
      pass: item.pass,
      role: item.role
    })
    this.selectedItems = item.std
  }

  onSave() {
    this.newStaff[this.seletedIndex] = this.editStaffData.value
    localStorage.setItem('newStaff', JSON.stringify(this.newStaff));

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
      this.newStaff.splice(this.del_index, 1);
      this.modalService.dismissAll();
      this.confDelete = ''
      this.toastr.success("Your data is removed from the system", "Note", {
        progressAnimation: 'increasing',
        progressBar: true,
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      })
      localStorage.setItem('newStaff', JSON.stringify(this.newStaff))

    }

    else if (this.confDelete !== '') {
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
