import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent {

  postArray: Post[] = []; // Array to store posts of a specific category
  categoryObj: any; // Object to store category information

  constructor(private route: ActivatedRoute, private postService: PostsService) {}

  ngOnInit(): void {
    // Subscribe to route parameters to get the category ID
    this.route.params.subscribe(val => {
      this.categoryObj = val;
      // Load posts for the specified category and subscribe to updates
      this.postService.loadCategoryPost(val['id']).subscribe((post: any) => {
        this.postArray = post;
      });
    });
  }
}