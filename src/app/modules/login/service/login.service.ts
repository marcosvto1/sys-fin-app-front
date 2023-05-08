import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Session } from '../../../shared/utils/session';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly http: HttpClient) {}

  login(login: { email: string; password: string }) {
    return this.http.post<{access_token: string}>(`${environment.url}/auth/access_token}`, login).pipe(
      map((data) => {
        const access_token = data.access_token;
        Session.setSession(access_token)
      })
    )
  }
}
