import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import * as moment from 'moment';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";


(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  model: NgbDateStruct | undefined;
  dropdownList: any = [];
  dropdownSettings: IDropdownSettings = {};
  selectedItems: any = [];
  attendanceReport: any = [];
  stuArr: any = []
  bsValue: any;
  docDefinition: any

  constructor(private formBuilder: FormBuilder, private router: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit() {
    this.attendanceReport = localStorage.getItem("studentAttendance")
    if (this.attendanceReport != null) {
      this.attendanceReport = JSON.parse(this.attendanceReport)
    }
    console.log(this.attendanceReport);

    this.dropdown()

  }

  dropdown() {
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
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false,
      closeDropDownOnSelection: true,
    };
  }

  onSelectDate() {
    let searhDate = moment(this.bsValue).format("DD/MM/YYYY");
    console.log(searhDate);

    let attendanceData = this.attendanceReport.find((x: any) => x.date == searhDate)
    this.stuArr = attendanceData.students
    console.log(this.stuArr);
  }

  onItemSelect($event: ListItem) {

  }

  downloadPdf() {

    // Step 1: Convert data into the desired format
    const tempdata: any = [
      ['ID', 'NAME', 'PRESENT', 'ABSENT']  // Header row
    ];

    this.stuArr.map((el: any, i: number) => {
      return tempdata.push([i + 1, el.student_name, el.present == true ? "P" : "-", el.absent == true ? "A" : "-"]);
    });


    // Step 2 and 4: Generate PDF with updated tempdata array
    this.docDefinition = {
      content: [
        {
          style: 'tableExample',
          table: {

            body: tempdata,// Ensure tempdata is a proper array of arrays
            widths: ["auto", '*', '*', '*'],  // Adjust column widths as needed
          }
        }
      ],

      styles: {
        tableExample: {
          margin: [0, 5, 0, 15],
          fontSize: 16,
          bold: true,
          fillcolor: "red"
        }
      }
    };

    pdfMake.createPdf(this.docDefinition).download('test.pdf');
  }





}
