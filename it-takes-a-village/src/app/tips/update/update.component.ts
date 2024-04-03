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
  post: Post |null = null;
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
        .subscribe(post => this.post = post? post : null)
        console.log(`postid ${postId}`)
      } else{
        console.log('nopoatid :(')
      }
    })
  }

onSubmit() {
  this.route.paramMap.subscribe(params => {
    const postId = params.get('id');
  if (postId) {
    this.dataService.updatePost(postId, this.postData)
      .then(() => {
        console.log('Post updated successfully!');
      })
      .catch(error => {
        console.error("Error updating post:", error);
      });
  } else {
    console.error('Error: Post data not available for update.');
  }
  })
}
}