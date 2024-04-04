import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { ImageuploadService } from 'src/app/services/imageupload.service';
import { Post } from 'src/app/types/post';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  // userEmail: string | null = null;
  postId: string | null = null;
  postData: Post = {
    title: '',
    img: '',
    content: '',
    ownerId: ''
  };

  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private apiService: ApiService,
    private imageUploadService: ImageuploadService,
    private router: Router,
    private authService: AuthService,
  ) {}

  // ngOnInit(): void {
  //   this.postId = this.route.snapshot.paramMap.get('id');
  //   if (this.postId) {
  //     // Retrieve the post data based on postId
  //     this.apiService.getPostById(this.postId).subscribe(async (post: Post | undefined) => {
  //       if (post) {
  //         try {
  //           console.log('Post owner ID:', post.ownerId);
  //           const isOwner = await this.authService.isOwner(post.ownerId);
  //           console.log('Is owner:', isOwner);
  //           if (isOwner) {
  //             console.log('You are owner!!!');
  //             // Populate the form with the retrieved post data
  //             this.postData = {
  //               title: post.title,
  //               img: post.img,
  //               content: post.content,
  //               ownerId: post.ownerId // Include ownerId here if it's available in the retrieved post
  //             };
  //           } else {
  //             console.error('You do not have permission to edit this post.');
  //             this.router.navigate(['/404']); // Redirect to 404 page
  //           }
  //         } catch (error) {
  //           console.error('Error checking ownership:', error);
  //         }
  //       } else {
  //         console.error('Post data not found.');
  //       }
  //     });
  //   } else {
  //     console.error('Post ID not provided.');
  //   }
  // }
  
  ngOnInit(): void {
    // this.authService.getCurrentUser().subscribe(user => {
    //   this.userEmail = user ? user.email : null;
    // });

    // console.log('header user email:', this.userEmail)
  
    if (this.postId) {
      // Retrieve the post data based on postId
      this.apiService.getPostById(this.postId).subscribe(async (post: Post | undefined) => {
        if (post) {
          console.log("there is post")
          try {
            this.postData = post;
            console.log("postOwner", this.postData.ownerId)
            } 
           catch (error) {
            console.error('Error checking ownership:', error);
            this.router.navigate(['/404']); // Redirect to 404 on error
          }
        } else {
          console.error('Post data not found.');
          this.router.navigate(['/404']); // Redirect to 404 if post not found
        }
      });
    } else {
      console.error('Post ID not provided.');
      this.router.navigate(['/404']); // Redirect to 404 if no post ID
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
  
            // Now that the image has been uploaded, update the post data
            // this.updatePostData(postId);
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

