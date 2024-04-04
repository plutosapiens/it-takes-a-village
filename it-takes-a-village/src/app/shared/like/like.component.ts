import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { LikeService } from 'src/app/services/like.service';
import { Post } from 'src/app/types/post';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  postId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
    private likeService: LikeService
  ){}

  async ngOnInit(): Promise<void> {
    let currentUserId: string = '';
    const user = await this.authService.getCurrentUser().pipe(take(1)).toPromise();
    currentUserId = user ? user.uid : 'idk';
    console.log('1currentuser id:', currentUserId )
    this.handleUserData(currentUserId);
  }

  handleUserData(currentUserId: string): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.apiService.getPostById(this.postId).subscribe((post: Post | undefined) => {
        if(post) {
          if(currentUserId == post.ownerId) {
            console.error('YOU CANT LIKE THAT, ITS YOURS');
            this.router.navigate(['/404']);
          } else {
            // Trigger the like action immediately when the component initializes
            this.likePost(this.postId!, currentUserId);
          }
        }
      });
    } else {
      console.error('Post ID not provided.');
    }
  }

  likePost(postId: string, userId: string): void {
    this.likeService.likeItem(postId, userId)
      .then(() => {
        console.log('Item liked successfully!');
        // Navigate back to the ArticleComponent after the like action is performed
        this.router.navigate(['/article', postId]); // Change the route as per your actual route configuration
      })
      .catch(error => {
        console.error('Error liking item:', error);
        // Handle error if necessary
      });
  }

}
