import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from 'src/app/auth.guard';
import { ClassesComponent } from './components/classes/classes.component';
import { HeaderComponent } from './components/header/header.component';
import { StaffComponent } from './components/staff/staff.component';
import { StudentsComponent } from './components/students/students.component';
export const Adminroutes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]
  },
  {
    path: 'profile', component: ProfileComponent, canActivate: [authGuard]
  },
  {
    path: 'classes',
    component: ClassesComponent, canActivate: [authGuard]
  },
  {
    path: 'staff',
    component: StaffComponent, canActivate: [authGuard]
  },
  {
    path: 'students',
    component: StudentsComponent, canActivate: [authGuard]
  },
];
