import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent {

  constructor(private dataService: DataService, private router: Router) {}

  addPost() {
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const img = (document.getElementById('img') as HTMLInputElement).value;
    const content = (document.getElementById('content') as HTMLInputElement).value;
    
    // Create new catalog post object
    const newPost = {
      title: title,
      img: img,
      content: content
    };

    // Call addPost from data service
    this.dataService.addPost(newPost)
    .then(() => {
      console.log('Item added successfully!');
      this.router.navigate(['/catalog'])
    })
    .catch(error => {
      console.error('Error adding item:', error);
      // Handle errors appropriately (e.g., display error message to user)
    });
  }
}
