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

  postArray : Post[] = [];
  categoryObj: any;

  constructor(private route : ActivatedRoute, private postService : PostsService){}

  ngOnInit(): void{
    this.route.params.subscribe(val => {
      console.log(val);
      this.categoryObj = val;
      this.postService.loadCategoryPost(val['id']).subscribe((post : any) => {
        this.postArray = post;
      })
    })
  }

}
