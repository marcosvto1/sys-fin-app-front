import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ICategory } from '../category.interface';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  categories: ICategory[] = [];

  constructor(private readonly categoryService: CategoryService) {}

  ngOnInit() {
    this.findCategories();
  }

  findCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        toastr.error('Failed to find categories');
      },
    });
  }
}
