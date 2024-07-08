import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { auto } from '@popperjs/core';



@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  lines: string[][] = [];
  stuData: any = []
  classData: any = []
  dropdownList: any = [];
  dropdownSettings: IDropdownSettings = {};
  selectedItems: any = []
  stdTofilter: string = '';
  filteredStd: any = [];
  search: string = ""
  serchData: any = []
  delIndex: number = 0;
  seletedIndex: number = 0;
  confDelete: string = '';

  editStuData = new FormGroup({
    fstName: new FormControl('', [Validators.required]),
    lstName: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    cls: new FormControl('', [Validators.required]),
  })

  constructor(private formBuilder: FormBuilder, private router: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.stuData = localStorage.getItem('studentData');
    if (this.stuData != null) {
      this.stuData = JSON.parse(this.stuData);
    }
    this.classData = localStorage.getItem('addClass');
    if (this.classData != null) {
      this.classData = JSON.parse(this.classData);
    }

    console.log(this.stuData);

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
      itemsShowLimit: 3,
      allowSearchFilter: false,
      closeDropDownOnSelection: true,
    };

    // this.matchData(); TO SHOW CLASS AS IT'S ID
  }

  matchData() {

    for (let i = 0; i < this.stuData.length; i++) {

      // Method 1 :-

      /*Object.values(this.classData).map((data: any, index) => {
        if (data.clsName.toLowerCase() === this.stuData[i][4].toLowerCase().trim()) {
          this.stuData[i][4] = data.clsId
        }
      })*/

      // Method 2 :-

      /*if (this.classData.filter((x: any) => x.clsName.toLowerCase() === this.stuData[i][4].toLowerCase().trim())) {
        this.stuData[i][4] = this.classData.find((x: any) => x.clsName === this.stuData[i][4].trim()).clsId
      }*/

      // Method 3 :-

      if (this.classData.filter((x: any) => x.clsName.toLowerCase().search(this.stuData[i][4].toLowerCase().trim()))) {
        this.stuData[i][4] = this.classData.find((x: any) => x.clsName === this.stuData[i][4].trim()).clsId;
      }

    }
  }

  onChangefile(event: any) {

    // Check for the various File API support.
    if (window.FileReader) {
      // FileReader are supported.
      this.getAsText(event.target.files[0]);
    } else {
      alert('FileReader are not supported in this browser.');
    }
  }

  getAsText(fileToRead: File) {

    var reader = new FileReader();
    reader.readAsText(fileToRead);

    // Handle data
    reader.onload = (e: any) => {
      const csv: string = e.target.result
      this.lines = this.parseCSV(csv)
      this.onDataLoaded(this.lines)
      this.stuData = this.lines
      localStorage.setItem('studentData', JSON.stringify(this.lines))
    }

  }

  parseCSV(csv: string): string[][] {
    const rows: string[] = csv.split('\n');
    console.log(rows);

    const result: string[][] = [];

    for (let i = 1; i < rows.length - 1; i++) {
      const cells: string[] = rows[i].split(',');
      console.log(cells);

      result.push(cells);
    }
    console.log(result);

    return result;
  }

  onDataLoaded(csvData: string[][]): void {
    console.log('CSV Data:', csvData);
    // You can do further processing or use the data as needed
  }

  onItemSelect(item: any) {
    console.log(item);

    for (let i = 0; i < this.stuData.length; i++) {
      this.filteredStd = this.stuData.filter((stu: any) => stu[4].toLowerCase().trim() == this.selectedItems[0].item_text.toLowerCase())
    }
    this.stuData = this.filteredStd
    console.log(this.stuData);

  }
  // onSelectAll(items: any) {
  //   console.log(items);
  // }

  clrfilter() {
    this.stuData = localStorage.getItem('studentData');
    if (this.stuData != null) {
      this.stuData = JSON.parse(this.stuData);
    }
  }

  onSerch(event: any) {
    this.search = event.target.value
    if (this.search != "") {
      let serchStu: any = localStorage.getItem('studentData');
      if (serchStu != null) {
        serchStu = JSON.parse(serchStu)
      }
      else {
        serchStu = [];
      }

      // this.serchData = serchStu.filter((stu: any) => (stu[0].toLowerCase().search(this.search.toLowerCase()) !== -1));
      this.serchData = serchStu.filter((stu: any) => stu[0].toLowerCase().includes(this.search.toLowerCase()));
      this.stuData = this.serchData

    }
    else {
      this.ngOnInit()
    }
  }

  currentSection: string = 'home';
  showSection(section: string) {
    this.currentSection = section;
  }

  onDelete(content: any, index: number) {
    this.modalService.open(content, { centered: true })
    this.delIndex = index;
  }

  onOk() {
    if (this.confDelete === 'Delete') {
      this.stuData.splice(this.delIndex, 1)
      this.modalService.dismissAll();
      this.confDelete = '';
      this.toastr.success("Your data is removed from the system", "Note", {
        progressAnimation: 'increasing',
        progressBar: true,
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      })
      localStorage.setItem('studentData', JSON.stringify(this.stuData))
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

  onEdit(content: any, item: any, index: number) {
    this.modalService.open(content)
    this.seletedIndex = index
    console.log(this.seletedIndex);

    this.editStuData.patchValue({
      fstName: item[0],
      lstName: item[1],
      age: item[2],
      gender: item[3],
      cls: item[4]
    })
  }

  onSave(data: any) {
    this.stuData[this.seletedIndex][0] = data.fstName;
    this.stuData[this.seletedIndex][1] = data.lstName;
    this.stuData[this.seletedIndex][2] = data.age;
    this.stuData[this.seletedIndex][3] = data.gender;
    this.stuData[this.seletedIndex][4] = data.cls;

    localStorage.setItem('studentData', JSON.stringify(this.stuData));

    this.modalService.dismissAll();

    this.toastr.info("Your data is updated", 'Info', {
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
      timeOut: 2000
    })

  }

}
