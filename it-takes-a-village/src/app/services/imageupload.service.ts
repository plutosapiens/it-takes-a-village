import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageuploadService {

  isLoading = false;

  constructor(private storage: AngularFireStorage) { }

  async uploadImage(file: File, path: string): Promise<string> {
    this.isLoading = true
    const fileRef = this.storage.ref(path);
    const uploadTask = this.storage.upload(path, file);

    try {
      await uploadTask.snapshotChanges().pipe(
        finalize(() => 
        this.isLoading = false
        // console.log('Image uploaded successfully')
        )
      ).toPromise();

      const downloadURL = await fileRef.getDownloadURL().toPromise();
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
}