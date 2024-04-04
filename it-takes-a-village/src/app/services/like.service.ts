import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app'; // Import firebase

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private firestore: AngularFirestore) { }

  likeItem(itemId: string, userId: string): Promise<void> {
    return this.firestore.collection('catalog').doc(itemId).update({
      likedBy: firebase.firestore.FieldValue.arrayUnion(userId) // Use firebase.firestore.FieldValue
    });
  }
}
