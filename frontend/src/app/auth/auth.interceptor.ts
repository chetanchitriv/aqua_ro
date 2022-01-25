import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../shared/authservice.service';
import { Router } from '@angular/router';
import { event } from 'jquery';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authservice:AuthserviceService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.headers.get('noauth'))
      return next.handle(request.clone());
    else{
      const clonedreq= request.clone({
        headers:request.headers.set("authorization","Bearer"+ this.authservice.getToken())
      });
      return next.handle(clonedreq)
    }   
  }
}
