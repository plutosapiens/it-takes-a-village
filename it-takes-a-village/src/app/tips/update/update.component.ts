import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
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
    content: ''
  };

  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private apiService: ApiService,
    private storage: AngularFireStorage,
    private imageUploadService: ImageuploadService,
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      // Retrieve the post data based on postId
      this.apiService.getPostById(this.postId).subscribe((post: Post | undefined) => {
        if (post) {
          // Populate the form with the retrieved post data
          this.postData = post;
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
          })
          .catch(error => {
            console.error('Error updating post:', error);
          });
        }
      }
    }, 100); // Check loader status every 100 milliseconds
  }  
}

  // onSubmit() {
  //   const postId = this.route.snapshot.paramMap.get('id');
  //   if (postId) {
  //     this.dataService.updatePost(postId, this.postData)
  //       .then(() => {
  //         console.log('Post updated successfully!');
  //         // Consider redirecting to a success page or displaying a success message
  //       })
  //       .catch(error => {
  //         console.error("Error updating post:", error);
  //       });
  //   } else {
  //     console.error('Error: Post data not available for update.');
  //   }
  // }