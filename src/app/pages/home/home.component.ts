import { Component } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  // Arrays to store featured and latest posts
  featuredPostArray: Post[] = [];
  latestPostArray: Post[] = [];

  constructor(private postService: PostsService) {}

  // Called when the component is initialized
  ngOnInit(): void {
    // Load featured posts from the service and subscribe to updates
    this.postService.loadFeatured().subscribe((val: any) => {
      this.featuredPostArray = val;
    });

    // Load latest posts from the service and subscribe to updates
    this.postService.loadLatest().subscribe((val: any) => {
      this.latestPostArray = val;
    });
  }
}