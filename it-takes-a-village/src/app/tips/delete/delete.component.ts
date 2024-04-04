import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

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
    if(currentUserId!==this.postId){
      console.error('NOT TODAY BUCKO!')
      this.router.navigate(['/'])
    } else{
      // Trigger the delete operation immediately when the component initializes
      this.deletePost(this.postId);
    }
  } else {
    console.error('Post ID not provided.');
  }
}

deletePost(postId: string): void {
  this.dataService.deletePost(postId)
    .then(() => {
      console.log('Post deleted successfully!');
      // Redirect to the catalog page upon successful deletion
      this.router.navigate(['/catalog']); // Navigate to catalog route
    })
    .catch(error => {
      console.error("Error deleting post:", error);
      // Handle error if necessary
    });
  }
}