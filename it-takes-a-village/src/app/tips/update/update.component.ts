import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { ImageuploadService } from 'src/app/services/imageupload.service';
import { Post } from 'src/app/types/post';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  postId: string | null = null;

  postData: Post = {
    title: '',
    img: '',
    content: '',
    likedBy: [] // I hope this doesnt return empty array
  };

  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private apiService: ApiService,
    private storage: AngularFireStorage,
    private imageUploadService: ImageuploadService,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    let currentUserId: string = '';
    const user = await this.authService.getCurrentUser().pipe(take(1)).toPromise();
    currentUserId = user ? user.uid : 'idk';
    console.log('1currentuser id:', currentUserId )
    this.handleUserData(currentUserId);
  }
  
  handleUserData(currentUserId: string): void {
    console.log('2currentuser email:', currentUserId )
  
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      // Retrieve the post data based on postId
      this.apiService.getPostById(this.postId).subscribe((post: Post | undefined) => {
      if (post) {
        if(currentUserId!==post.ownerId){
          console.error('YOU ARE NOT ALOWED!')
          this.router.navigate(['/404'])
        }
        // Populate the form with the retrieved post data
        this.postData = post;
        console.log('ownerid', this.postData.ownerId)
        } else {
          console.error('Post data not found.');
        }
      });
    } else {
      console.error('Post ID not provided.');
    }
  }
  
  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const postId = this.route.snapshot.paramMap.get('id');
      if (postId) {
        // Define path in Firebase Storage where the image will be stored
        const path = `uploads/${postId}_${file.name}`;
        this.isLoading = true; // Set isLoading to true while uploading
        // Call the uploadImage method from imageuploadService
        this.imageUploadService.uploadImage(file, path)
        .then(downloadUrl => {
          // Update the postData object with the imageUrl
          this.postData.img = downloadUrl;
          console.log('File available at', downloadUrl);
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        })
        .finally(() => {
          this.isLoading = false // Set isLoading to false after uploading
        })
      } else {
        console.error('Post ID not available.');
      }
    }
  }
    
  updatePostData(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    console.log('Post ID:', postId); // Log the value of postId
    const checkLoaderInterval = setInterval(() => {
      if (!this.isLoading) { // Proceed only if isLoading is false
        clearInterval(checkLoaderInterval); //Stop checking the loader status
        if(postId) {
          this.dataService.updatePost(postId, this.postData)
          .then(() => {
            console.log('Post updated successfully!');
            this.router.navigate(['/catalog']);
          })
          .catch(error => {
            console.error('Error updating post:', error);
          });
        }
      }
    }, 100); // Check loader status every 100 milliseconds
  }  

}