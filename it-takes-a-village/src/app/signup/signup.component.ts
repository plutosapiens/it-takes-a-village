import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService) {}

    ngOnInit(): void { }

  signup() {
    this.authService.signup(this.email, this.password)
    .then(() => {
      // Handle succesful signup (e.g., navigate to home page)
    })
    .catch(error => {
      console.error('Signup error:', error);
      const errorMessage = error.message;
      alert(errorMessage); // Display error message to user
    });
  }

}
