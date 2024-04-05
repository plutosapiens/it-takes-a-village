import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { LikeService } from 'src/app/services/like.service';
import { Post } from 'src/app/types/post';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  post: Post | null = null;
  postId: string | null = null;

  isOwner: boolean = false;
  isLiked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private apiService: ApiService,
    private likeService: LikeService,
  ) {}

  urlId: string = '';
  userId: string = '';

  async ngOnInit(): Promise<void> {
    let currentUserId: string = '';
    const user = await this.authService
      .getCurrentUser()
      .pipe(take(1))
      .toPromise();
    currentUserId = user ? user.uid : 'idk';
    this.userId = currentUserId;
    this.handleUserData(currentUserId);
  }

  handleUserData(currentUserId: string) {
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.apiService
        .getPostById(this.postId)
        .subscribe((post: Post | undefined) => {
          if (post) {
            this.post = post;
            this.isLiked = post.likedBy.includes(currentUserId); // Check if current user liked the post
            if (currentUserId !== post.ownerId) {
              this.isOwner = false;
            } else {
              this.isOwner = true;
            }
          }
        });
    }

    this.route.paramMap.subscribe((params) => {
      const postId = params.get('id');
      if (postId) {
        this.firestore
          .collection<Post>('catalog')
          .doc<Post>(postId)
          .valueChanges()
          .subscribe((post) => (this.post = post ? post : null));
        this.urlId = postId;
      }
    });
  }

  likePost() {
    if (!this.postId || !this.userId) {
      console.error('Post ID or current user ID is missing.');
      return;
    }
    if (this.isLiked) {
      // Unlike the post
      this.likeService
        .unlikeItem(this.postId, this.userId)
        .then(() => {
          console.log('Post unliked successfully!');
          this.isLiked = false;
        })
        .catch((error: any) => {
          console.error('Error unliking post:', error);
          // Handle error if necessary
        });
    } else {
      // Like the post
      this.likeService
        .likeItem(this.postId, this.userId)
        .then(() => {
          console.log('Post liked successfully!');
          this.isLiked = true;
        })
        .catch((error) => {
          console.error('Error liking post:', error);
          // Handle error if necessary
        });
    }
  }
}
