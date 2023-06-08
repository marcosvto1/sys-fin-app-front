import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session } from './utils/session';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const session = Session.getSession();
    if (session?.accessToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${session?.accessToken}` },
      });
      return next.handle(request);
    }
    return next.handle(request);
  }
}
