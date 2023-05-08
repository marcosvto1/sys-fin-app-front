import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { SharedModule } from './../../shared/shared.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';

const routes: Route[] = [
  { path: '', component: CategoryListComponent },
  { path: 'new', component: CategoryFormComponent },
  { path: ':id/edit', component: CategoryFormComponent },
];

@NgModule({
  declarations: [CategoryListComponent, CategoryFormComponent],
  imports: [
    SweetAlert2Module,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class CategoryModule {}
