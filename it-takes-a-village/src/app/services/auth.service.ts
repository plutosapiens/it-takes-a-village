import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { User } from "@firebase/auth-types"; // Update import

import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private afAuth: AngularFireAuth) {


  }

  getCurrentUser(): Observable<User | null> {
    return this.afAuth.authState;
  }

    // Check if the currently logged-in user is the owner of the item
    async isOwner(postOwnerId: string): Promise<boolean> {
      const user = await this.getCurrentUser().toPromise();  
      console.log('Current user ID:', user?.uid);
  console.log('Post owner ID:', postOwnerId);
      return user ? user.uid === postOwnerId : false;
    }

  signup(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.afAuth.signOut()
  }
}
