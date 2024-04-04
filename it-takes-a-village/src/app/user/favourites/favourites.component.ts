import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/types/post';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit{
  posts: Post[] = [];

  constructor(private apiService: ApiService,
    private authService: AuthService
    ) {}

  async ngOnInit(): Promise <void> {
    let currentUserId: string = '';
    const user = await this.authService.getCurrentUser().pipe(take(1)).toPromise();
    currentUserId = user ? user.uid : 'idk';
    console.log('1currentuser id:', currentUserId )
    this.handleUserData(currentUserId);



  }
  
  handleUserData(currentUserId: string): void {
    this.apiService.getCatalogItems()
      .subscribe(data => {
        // Filter using map and filter combination
        this.posts = data
          .map(post => (post.likedBy && post.likedBy.includes(currentUserId) ? post : undefined))
          .filter(post => post !== undefined) as Post[]; // Type assertion after filtering
      }, error => console.error(error));
  }
  
}
