import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminPortalComponent } from './components/layouts/admin-portal/admin-portal.component';
import { TeachersPortalComponent } from './components/layouts/teachers-portal/teachers-portal.component';
import { AdminPortalModule } from './components/layouts/admin-portal/admin-portal.module';
import { TeachersPortalModule } from './components/layouts/teachers-portal/teachers-portal.module';


//Admin Portal Module


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,

    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    ReactiveFormsModule,
    //Admin module
    AdminPortalModule,
    // Teachers Module
    TeachersPortalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
