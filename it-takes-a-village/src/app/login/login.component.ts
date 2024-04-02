import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {}
  login() {
    this.authService.login(this.email, this.password)
    .then(() => {
      // Handle successful login (e.g., navigate to another page)
    })
    .catch(error => {
      // Handle login error (e.g., display error message)
    });
  }
}
