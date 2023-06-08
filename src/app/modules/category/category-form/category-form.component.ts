import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';

import * as toastr from 'toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {
  form!: FormGroup
  constructor(
    private readonly fb: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly router: Router
  ) {}

  buildForm() {
    this.form = this.fb.group({
      name: this.fb.control("", [Validators.required])
    })
  }

  showFieldError(fieldName: string) {
    const field = this.form.get(fieldName);
    return field?.invalid && (field.touched || field.dirty);
  }

  onSubmit() {
    this.categoryService.create(this.form.getRawValue()).subscribe({
      next: (result) => {
        toastr.success('Category created with success');
        this.router.navigate(['/categories']);
      },
      error: (err) => {
        toastr.error('faild to create category');
      },
    })
  }
}
