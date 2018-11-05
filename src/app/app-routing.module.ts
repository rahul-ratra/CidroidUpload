import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { CiFormComponent } from './ci-form/ci-form.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';


const routes: Routes = [
  {path : 'cibulkform', component: CiFormComponent},
  {path : 'uploadfile' , component: UploadfileComponent}
];
@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
