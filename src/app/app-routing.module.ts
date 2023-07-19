import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {path: '', redirectTo: '/file-upload', pathMatch: 'full'},
  { path: 'file-upload', loadChildren: () => import('./file-upload/file-upload.module').then(m => m.FileUploadModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
