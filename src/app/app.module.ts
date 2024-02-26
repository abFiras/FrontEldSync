import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ElderComponent } from './elder/elder.component';
import { NurseComponent } from './nurse/nurse.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    WelcomePageComponent,
    DoctorComponent,
    ElderComponent,
    NurseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
