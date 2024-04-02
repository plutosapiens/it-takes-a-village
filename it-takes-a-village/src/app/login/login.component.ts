import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void { }
  login() {
    this.authService.login(this.email, this.password)
    .then(() => {
      // Handle successful login (e.g., navigate to another page)
      this.router.navigate(['/']);
    })
    .catch(error => {
      console.error('Login error:', error);
      const errorMessage = error.message;
      alert(errorMessage); // Display error message to user
    });
  }
}
