import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void { }

  logout() {
    this.authService.logout()
    .then(() => {
      console.log('logged out :)')
      // Handle successful logout (optional)
    })
    .catch(error => {
      console.error('Logout error:', error);
      console.log('whopsie')
      // Handle logout error (optional)
    });
  }
}
