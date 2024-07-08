import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { TeachersPortalComponent } from './components/layouts/teachers-portal/teachers-portal.component';
import { AdminPortalComponent } from './components/layouts/admin-portal/admin-portal.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'teachers',
    component: TeachersPortalComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./components/layouts/teachers-portal/teachers-portal.module').then(m => m.TeachersPortalModule)
      }
    ],
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: AdminPortalComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./components/layouts/admin-portal/admin-portal.module').then(m => m.AdminPortalModule)
      }
    ],
    canActivate: [authGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
