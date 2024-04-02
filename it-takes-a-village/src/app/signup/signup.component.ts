import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  signup() {
    this.authService.signup(this.email, this.password)
    .then(() => {
      // Handle succesful signup (e.g., navigate to home page)
    })
    .catch(error => {
      // Handle signup error(e.g., display error message)
    });
  }

}
