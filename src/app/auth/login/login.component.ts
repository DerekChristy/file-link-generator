import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  invalidInfo = false;
  constructor(
    fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = fb.group({
      email: ['', Validators.compose([Validators.required])],
      passwd: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.form.invalid) return;

    this.invalidInfo = false;
    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        const { token, user } = res;
        this.authService.newSession({
          token,
          user,
        });
        if (res['isAdmin']) {
          this.authService.activateAdmin();
          this.router.navigate(['/admin']);
        } else this.router.navigate(['/']);
      },
      error: (err) => {
        if (err['message']) {
          this.invalidInfo = true;
        } 
      }
    });
  }
}
