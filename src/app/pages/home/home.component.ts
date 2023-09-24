import { Component } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  featuredPostArray : Post[] = [];

  constructor( private postService : PostsService){
    this.postService.loadFeatured().subscribe((val : any) => {
      this.featuredPostArray = val;
    })
  }


}
