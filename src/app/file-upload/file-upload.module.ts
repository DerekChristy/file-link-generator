import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadRoutingModule } from './file-upload-routing.module';
import { FileUploadComponent } from './file-upload.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { UploadsComponent } from './uploads/uploads.component'

@NgModule({
  declarations: [
    FileUploadComponent,
    UploadsComponent
  ],
  imports: [
    CommonModule,
    FileUploadRoutingModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class FileUploadModule { }
