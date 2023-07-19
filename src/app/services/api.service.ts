import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  uploadfile(data: FormData): Observable<any> {
    return this.http.post(environment.server + '/upload', data, {
      reportProgress: true,
      observe: 'events'
    })
  }
  uploadfilePremium(data: FormData): Observable<any> {
    return this.http.post(environment.server + '/upload-premium', data, {
      reportProgress: true,
      observe: 'events'
    })
  }
  uploads(): Observable<any> {
    return this.http.get(environment.server + '/uploads')
  }
}
