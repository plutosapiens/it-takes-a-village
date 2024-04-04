import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  
  unlikeItem(itemId: string, userId: string): Promise<void> {
    return this.firestore.collection('catalog').doc(itemId).update({
      likedBy: firebase.firestore.FieldValue.arrayRemove(userId)
    });
  }

  constructor(private firestore: AngularFirestore) { }

  likeItem(itemId: string, userId: string): Promise<void> {
    return this.firestore.collection('catalog').doc(itemId).update({
      likedBy: firebase.firestore.FieldValue.arrayUnion(userId)
    });
  }
}
