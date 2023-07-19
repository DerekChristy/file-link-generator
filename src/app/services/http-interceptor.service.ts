import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError, throwError } from 'rxjs'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getSessionToken()
    if (!token) {
      return next.handle(req)
    }
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getSessionToken()}`
      }
    })
    return next.handle(tokenizedReq).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.handleHttpError(err)
        }
        return throwError(() => new Error('API error'))
      })
    )
  }

  handleHttpError(err: HttpErrorResponse) {
    if (err.status === HttpStatusCode.Unauthorized) {
      this.router.navigate(['/auth/login'])
    }
  }
}
