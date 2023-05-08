import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

const routes: Routes = [{ path: '', component: LoginFormComponent }];

@NgModule({
  declarations: [LoginFormComponent],
  imports: [SweetAlert2Module,  ReactiveFormsModule, RouterModule.forChild(routes), CommonModule],
})
export class LoginModule {}
