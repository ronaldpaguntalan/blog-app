import { Component } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent {
  categoryArray: Category[] = [];

  constructor(
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    // Load category data when the component is initialized
    this.categoryService.loadData().subscribe((val: any) => {
      this.categoryArray = val;
    });
  }
}
