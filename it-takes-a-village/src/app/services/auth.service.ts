import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { User } from "@firebase/auth-types";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {}

  getCurrentUser(): Observable<User | null> {
    return this.afAuth.authState;
  }

  
  signup(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }
  
  login(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
  
  // Returns true when user is looged in and email is verified
  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user)
    );
  }
  
  logout(){
    return this.afAuth.signOut()
  }
}

