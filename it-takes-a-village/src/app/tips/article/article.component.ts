import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/types/post';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  post: Post | null = null;
  postId: string | null = null;

  isOwner: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private firestore: AngularFirestore,
    private authService: AuthService,
    private apiService: ApiService,
    ) {}

  urlId: string = ''

  async ngOnInit(): Promise<void> {
    let currentUserId: string = '';
    const user = await this.authService.getCurrentUser().pipe(take(1)).toPromise();
    currentUserId = user ? user.uid : 'idk';
    console.log('1currentuser id:', currentUserId )
    this.handleUserData(currentUserId);
    console.log("isowner", this.isOwner)
  }

  handleUserData(currentUserId: string) {

    this.postId = this.route.snapshot.paramMap.get('id');
    if(this.postId) {
      this.apiService.getPostById(this.postId).subscribe((post: Post | undefined) => {
        if (post) {
          // Use the retrieved post data here
          this.post = post;
          if (currentUserId !== post.ownerId) {
            this.isOwner = false;
          } else {
            this.isOwner = true;
          }
        }
      })
    }


    this.route.paramMap.subscribe(params => {
      const postId = params.get('id');
      if(postId) {
        this.firestore.collection<Post>('catalog').doc<Post>(postId).valueChanges()
        .subscribe(post => this.post = post? post : null)
        this.urlId = postId
      } 
    })
  }
}