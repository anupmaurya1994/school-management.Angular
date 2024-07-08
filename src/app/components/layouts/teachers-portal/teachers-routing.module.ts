import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TeachersPortalComponent } from './teachers-portal.component';
import { authGuard } from 'src/app/auth.guard';
import { ClassesComponent } from './components/attendance/classes.component';
import { StudentsComponent } from './components/students/students.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { ReportsComponent } from './components/reports/reports.component';
export const Teachersroutes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]
  },
  {
    path: 'profile', component: ProfileComponent, canActivate: [authGuard]
  },
  {
    path: 'classes', component: ClassesComponent, canActivate: [authGuard]
  },
  {
    path: 'students', component: StudentsComponent, canActivate: [authGuard]
  },
  {
    path: 'sessions/:classID', component: SessionsComponent, canActivate: [authGuard]
  },
  {
    path: 'reports', component: ReportsComponent, canActivate: [authGuard]
  },
];
