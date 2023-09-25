import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent {
  postData: any; // Holds the data of the single post
  similarPostArray: Post[] = []; // Holds an array of similar posts

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameters to get the post ID
    this.route.params.subscribe((post) => {
      // Count the view for this post
      this.postService.countViews(post['id']);

      // Load the data of the single post
      this.postService.loadOnePost(post['id']).subscribe((post: any) => {
        this.postData = post;
        
        // Load similar posts based on the category of the current post
        this.loadSimilarPost(this.postData.category.categoryId);
      });
    });
  }

  // Function to load similar posts based on the category ID
  loadSimilarPost(catId: string) {
    this.postService.loadSimilar(catId).subscribe((val : any)=> {
      this.similarPostArray = val;
    });
  }
}