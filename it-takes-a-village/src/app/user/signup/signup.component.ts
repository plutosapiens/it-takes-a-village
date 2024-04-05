import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signup() {
    this.authService
      .signup(this.email, this.password)
      .then(() => {
        this.router.navigate(['/']); // Handle succesful signup (e.g., navigate to home page)
      })
      .catch((error) => {
        console.error('Signup error:', error);
        const errorMessage = error.message;
        alert(errorMessage); // Display error message to user
      });
  }
}
