import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoAuthComponent } from './no-auth/no-auth.component';
import { NoFoundComponent } from './no-found/no-found.component';
import { RouterModule } from '@angular/router';

const routes = [
  {path: 'no-found', component: NoFoundComponent},
  {path: 'no-auth', component: NoAuthComponent}
]

@NgModule({
  declarations: [
    NoAuthComponent,
    NoFoundComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class PagesModule { }
