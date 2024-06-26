import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Post } from 'src/app/types/post';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  postId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
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
          if(currentUserId !== post.ownerId) {
            console.error('NOT TODAY BUCKO!');
            this.router.navigate(['/404']);
          } else {
            this.deletePost(this.postId!);
          }
        }
      });
    } else {
      console.error('Post ID not provided.');
    }
  }
  


deletePost(postId: string): void {
  this.dataService.deletePost(postId)
    .then(() => {
      console.log('Post deleted successfully!');
      this.router.navigate(['/catalog']); // Navigate to catalog route
    })
    .catch(error => {
      console.error("Error deleting post:", error);
      // Handle error if necessary
    });
  }
}