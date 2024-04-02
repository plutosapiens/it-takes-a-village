import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userEmail: string | null = null;

  constructor() { }

  ngOnInit(): void {
    try {
      // Initialize Firebase app
      const firebaseApp = initializeApp(environment.firebase);
      // Get authentication instance
      const auth = getAuth(firebaseApp);

      // Check authentication state
      onAuthStateChanged(auth, (user: User | null) => {
        if (user) {
          console.log(`User is signed in ${user.email}`);
          this.userEmail = user.email
          // You can do other tasks here, such as updating UI or redirecting the user.
        } else {
          console.log('User is not signed in');
          // You can do other tasks here, such as displaying a login form.
        }
      });
    } catch (error) {
      console.error('Error initializing Firebase or checking authentication state:', error);
      // Handle error appropriately (e.g., display an error message)
    }
  }
}
