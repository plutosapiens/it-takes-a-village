import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Post } from 'src/app/types/post';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  post: Post | null = null;
  constructor(
    private dataService: DataService, 
    private route: ActivatedRoute,
    private firestore: AngularFirestore) {}
    
  postData: Post = {
    title: '',
    img: '',
    content: '',
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const postId = params.get('id');
      if(postId) {
        this.firestore.collection<Post>('catalog').doc<Post>(postId).valueChanges()
        .subscribe(post => this.post = post ? post : null)          
        console.log('Post data retrieved:', this.post); // Log retrieved data
        
        console.log(`postid ${postId}`)

            }
          });
  }

  onSubmit() {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.dataService.updatePost(postId, this.postData)
        .then(() => {
          console.log('Post updated successfully!');
          // Consider redirecting to a success page or displaying a success message
        })
        .catch(error => {
          console.error("Error updating post:", error);
        });
    } else {
      console.error('Error: Post data not available for update.');
    }
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Handle image upload logic using your preferred method (e.g., Firebase Storage)
      // Update postData.img with the uploaded image URL after successful upload
      console.log('Image selected for upload:', file.name);
    }
  }
}