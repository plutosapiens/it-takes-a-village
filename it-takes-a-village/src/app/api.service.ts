import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Post } from './types/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private firestore: AngularFirestore) { } // Inject AngularFirestore

  getCatalogItems(): Observable<Post[]> {
    return this.firestore.collection<Post>('catalog').valueChanges(); // Fetch themes from Firestore
  }

  // You can implement other methods here for CRUD operations with Firestore
}
