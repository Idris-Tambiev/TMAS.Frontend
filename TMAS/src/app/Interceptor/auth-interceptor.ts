import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const tokenObject = JSON.parse(localStorage.getItem('userToken'));

    if (tokenObject == null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${''}`,
        },
      });
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${tokenObject.access_token}`,
        },
      });
    }
    return next.handle(request);
  }
}
