import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'file-share';
  user: any;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.onLoginChange$.subscribe({ next: (value: any) => {
      if (value) {
        this.user = value.user;
      }
    }})
  }

  logout() {
    this.authService.logout();
  }
}
