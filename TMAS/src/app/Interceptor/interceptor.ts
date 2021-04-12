import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var token = JSON.parse(localStorage.getItem('userToken'));

    if (token == null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${''}`,
        },
      });
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token.access_token}`,
        },
      });
    }
    return next.handle(request);
  }
}
