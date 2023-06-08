import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Session } from '../../../shared/utils/session';

@Component({
  selector: 'app-no-auth',
  templateUrl: './no-auth.component.html',
  styleUrls: ['./no-auth.component.scss']
})
export class NoAuthComponent {
  constructor(
    private readonly router: Router
  ) {}

  toLoginPage() {
    Session.clear();
    this.router.navigateByUrl("/")
  }
}
