import { Component, OnInit } from '@angular/core'
import { ApiService } from '../services/api.service'
import { HttpEventType } from '@angular/common/http'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  file: File | undefined
  formData = new FormData()
  uploadProgress = 0
  link: string | undefined;
  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {}
  handleFiles(event: any) {
    console.log(event, event.files)
    const file: File = event.files[0]
    if (file) {
      this.link = undefined;
      this.file = file
      this.formData = new FormData()
      this.formData.append('file', this.file)
    }
  }

  generateLink() {
    let api = this.apiService.uploadfile(this.formData);
    if (this.authService.isLoggedIn()) {
      api = this.apiService.uploadfilePremium(this.formData);
    }
    api.subscribe({
      next: (value) => {
        if (value.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (value.loaded / value.total))
        } else if (value.type == HttpEventType.Response) {
          this.link = value.body.link;
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
