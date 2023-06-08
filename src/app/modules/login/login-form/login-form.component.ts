import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from '../service/login.service';

import * as toastr from 'toastr';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {

  }

  ngOnInit() {
    this.form = this.buildFormGroup()
  }


  buildFormGroup() {
    return this.formBuilder.group({
      email: new FormControl('marcosvto1@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('46557985', Validators.required),
    });
  }

  showFieldError(fieldName: string) {
    const field = this.form.get(fieldName)
    return field?.invalid && (field.touched || field.dirty)
  }

  handleForm() {
    console.log(this.form.getRawValue());
    this.loginService.login(this.form.getRawValue()).subscribe({
      next: (v) => {
        toastr.success('login successfuly')
        this.router.navigateByUrl("/admin/transactions")
      },
      error: (err) => {
        toastr.error('Server not respond, try againg!!')
        console.error(err);
      },
      complete: () => {},
    });
  }
}




