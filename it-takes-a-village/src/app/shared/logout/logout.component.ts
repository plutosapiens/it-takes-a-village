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
        console.log('Logged out successfully');
        // Redirect to home page after logout
        window.location.reload();
      })
      .catch(error => {
        console.error('Logout error:', error);
        // Handle logout error (optional)
      });
  }
}
