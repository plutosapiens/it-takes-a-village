import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageuploadService } from 'src/app/services/imageupload.service';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css']
})
export class ImageuploadComponent {

  @Input() file: File | null = null; // Input to receive the file from the parent component
  @Output() downloadURL = new EventEmitter<string>(); // Output to emit the download URL

  isLoading = false;

  constructor(private imageService: ImageuploadService) {}

  async uploadImage() {
    if (!this.file) {
      return; // No file selected
    }

    const uploadPath = `uploads/${this.file.name}`;
    this.isLoading = true;

    try {
      const downloadURL = await this.imageService.uploadImage(this.file, uploadPath);
      this.downloadURL.emit(downloadURL); // Emit the download URL to the parent component
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle upload error (optional: emit an error event or display an error message)
    } finally {
      this.isLoading = false;
    }
  }
}
