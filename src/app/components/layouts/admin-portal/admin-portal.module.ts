import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Adminroutes } from './admin-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { AdminPortalComponent } from './admin-portal.component';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ClassesComponent } from './components/classes/classes.component';
import { StaffComponent } from './components/staff/staff.component';
import { StudentsComponent } from './components/students/students.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    HeaderComponent,
    AdminPortalComponent,
    ClassesComponent,
    StaffComponent,
    StudentsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDropdownModule,
    NgMultiSelectDropDownModule.forRoot(),

    RouterModule.forChild(Adminroutes)
  ],
  exports: [AdminPortalComponent]
})
export class AdminPortalModule { }
