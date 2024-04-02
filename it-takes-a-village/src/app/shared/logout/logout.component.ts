import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void { }

  logout() {
    this.authService.logout()
      .then(() => {
        console.log('Logged out successfully');
        // Redirect to home page after logout
        // window.location.reload();    
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.error('Logout error:', error);
        // Handle logout error (optional)
      });
  }
}
