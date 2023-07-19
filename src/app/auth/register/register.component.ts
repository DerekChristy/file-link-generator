import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup
  phone = ''
  hasReferral = false
  errors = {
    email: false,
    phone: false
  }
  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = fb.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.compose([Validators.required])],
      passwd: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)])
      ],
      rePasswd: ['']
    })
  }
  ngOnInit(): void {}
  toggleReferral() {
    this.hasReferral = this.hasReferral ? false : true
  }
  submitForm() {
    if (this.form.invalid) return
    this.authService.newUser(this.form.value).subscribe((res) => {
      if (res) {
        const { token, user } = res
        this.authService.newSession({
          token,
          user
        })
        this.router.navigate(['/'])
      }
    })
  }
  phoneError(e: any) {
    console.log(e)
    this.errors.phone = !e
  }
  getNumber(e: any) {
    console.log(e)
    this.phone = e
  }
}
