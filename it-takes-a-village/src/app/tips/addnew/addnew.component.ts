import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ImageuploadService } from 'src/app/services/imageupload.service';
import { Post } from 'src/app/types/post';

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent {

  selectedPost: Post | null = null;

  constructor(
    private dataService: DataService, 
    private router: Router,
    private authService: AuthService,
    private imageService: ImageuploadService,
  ) {}

  async addPost() {
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const img = (document.getElementById('img') as HTMLInputElement).value;
    const content = (document.getElementById('content') as HTMLInputElement).value;
    
    let ownerId: string = '';

    try {

      if (!title || title.trim() === '') {
        throw new Error('Title is required.'); // Throw error for client-side handling
      }
      
      if (!img || img.trim() === '') {
        throw new Error('Image URL is required.'); // Throw error for client-side handling
      }
      
      if (!content || content.trim() === '') {
        throw new Error('Content is required.'); // Throw error for client-side handling
      }

      const user = await this.authService.getCurrentUser().pipe(take(1)).toPromise();
      ownerId = user ? user.uid : 'idk';
      
      const newPost = {
        title: title,
        img: 'image',
        content: content,
        ownerId: ownerId
      };
      console.log(`newpostOwner: ${newPost.ownerId}`);

      await this.dataService.addPost(newPost);
      console.log('Item added successfully!');
      this.router.navigate(['/catalog']);
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        console.error('Http Error:', error.statusText);
        alert('An HTTP error occurred: ' + error.statusText); // Display HTTP error message to user
      } else if (error instanceof Error) {
        console.error('Error adding item:', error.message);
        alert('An error occurred: ' + error.message); // Display generic error message to user
      } else {
        console.error('Unknown error:', error);
        alert('An unknown error occurred.'); // Display generic error message to user
      }
    }
  }
}
