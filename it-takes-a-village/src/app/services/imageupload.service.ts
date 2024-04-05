import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageuploadService {
  constructor(private storage: AngularFireStorage) {}

  async uploadImage(file: File, path: string): Promise<string> {
    const fileRef = this.storage.ref(path);
    const uploadTask = this.storage.upload(path, file);

    try {
      await uploadTask
        .snapshotChanges()
        .pipe(finalize(() => console.log('Image uploaded succesfully')))
        .toPromise();

      const downloadURL = await fileRef.getDownloadURL().toPromise();
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
}
