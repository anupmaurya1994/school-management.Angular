import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Teachersroutes } from './teachers-routing.module';
import { TeachersPortalComponent } from './teachers-portal.component';
import { TeacherHeaderComponent } from './components/teacher-header/teacher-header.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ClassesComponent } from './components/attendance/classes.component';
import { StudentsComponent } from './components/students/students.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SessionsComponent } from './components/sessions/sessions.component';
import { NgbAlertModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import { ReportsComponent } from './components/reports/reports.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    TeacherHeaderComponent,
    TeachersPortalComponent,
    ClassesComponent,
    StudentsComponent,
    SessionsComponent,
    ReportsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(Teachersroutes),
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule,
    [NgbAlertModule, FormsModule, JsonPipe],
    BsDatepickerModule,
    ModalModule.forRoot(),
    NgbDropdownModule,
  ],
  exports: [TeachersPortalComponent]
})
export class TeachersPortalModule { }
