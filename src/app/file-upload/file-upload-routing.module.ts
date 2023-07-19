import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FileUploadComponent } from './file-upload.component'
import { UploadsComponent } from './uploads/uploads.component'
import { AuthGuard } from '../services/auth.guard'

const routes: Routes = [
  { path: '', component: FileUploadComponent },
  { path: 'uploads', component: UploadsComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileUploadRoutingModule {}
