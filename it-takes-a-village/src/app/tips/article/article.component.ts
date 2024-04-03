import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Post } from 'src/app/types/post';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  post: Post |null = null;
  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const postId = params.get('id');
      if(postId) {
        this.firestore.collection<Post>('catalog').doc<Post>(postId).valueChanges()
        .subscribe(post => this.post = post? post : null)
      }
    })
  }
  // }
}
