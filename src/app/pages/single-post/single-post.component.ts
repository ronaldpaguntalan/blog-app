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
  postData: any;
  similarPostArray: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((post) => {
      this.postService.loadOnePost(post['id']).subscribe((post: any) => {
        this.postData = post;
        this.loadSimilarPost(this.postData.category.categoryId);
      });
    });


  }

  loadSimilarPost(catId: string) {
    this.postService.loadSimilar(catId).subscribe((val : any)=> {
      this.similarPostArray = val;
    });
  }
}
