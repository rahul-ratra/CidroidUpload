import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CiFormComponent } from './ci-form/ci-form.component';
import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './/app-routing.module';
import { UploadfileComponent } from './uploadfile/uploadfile.component';


@NgModule({
  declarations: [
    AppComponent,
    CiFormComponent,
    UploadfileComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
