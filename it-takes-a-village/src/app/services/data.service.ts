import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Post } from '../types/post';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: AngularFirestore) { }

  addPost(newPost: Post) {
    return this.firestore.collection('catalog').add(newPost);
  }

}
