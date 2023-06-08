import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../../utils/session';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(
    private readonly router: Router
  ) {}

  logout() {
    Session.clear();
    this.router.navigate(['/'])
  }
}
