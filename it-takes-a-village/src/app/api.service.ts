import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Post } from './types/post';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private postsCollection: AngularFirestoreCollection<Post>;

  constructor(private firestore: AngularFirestore) {
    this.postsCollection = this.firestore.collection<Post>('catalog'); // Reference catalog collection
  }

  getCatalogItems(): Observable<Post[]> {
    return this.postsCollection.valueChanges({ idField: 'id' });
  }

 

  // ... other CRUD methods as needed
}
