import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Post } from './types/post';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private postsCollection: AngularFirestoreCollection<Post>;

  constructor(private firestore: AngularFirestore) {
    this.postsCollection = this.firestore.collection<Post>('catalog'); // Reference catalog collection
  }

  getCatalogItems(): Observable<Post[]> {
    return this.postsCollection.valueChanges({ idField: 'id' });
  }

  getPostById(postId: string): Observable<Post | undefined> {
    const postDoc: AngularFirestoreDocument<Post> =
      this.postsCollection.doc<Post>(postId);
    return postDoc.valueChanges().pipe(
      map((post) => (post ? post : undefined)), // Handle potential missing documents
      catchError((error: any) => {
        console.error('Error retrieving post by ID:', error);
        return throwError(error); // Re-throw the error for handling in the component
      })
    );
  }
}
