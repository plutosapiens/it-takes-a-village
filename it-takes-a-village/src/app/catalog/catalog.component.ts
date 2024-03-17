import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Post } from '../types/post';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  posts: Post[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getCatalogItems()
      .subscribe(data => {
        this.posts = data;

                // Log the entire array and individual post properties
                console.log(this.posts);
                for (const post of this.posts) {
                  console.log(post.title);
                  console.log(post.content);
                }

       }, error => console.error(error));
  }
}