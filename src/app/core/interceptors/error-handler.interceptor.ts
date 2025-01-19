import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage: string;

        switch (error.status) {
          case 400:
            errorMessage = 'Invalid request format';
            break;
          case 401:
            errorMessage = 'You need to be authenticated';
            break;
          case 403:
            errorMessage = "You don't have permission to perform this action";
            break;
          case 404:
            errorMessage = 'The requested resource was not found';
            break;
          case 500:
            errorMessage = 'A server error occurred';
            break;
          default:
            errorMessage = 'An unexpected error occurred';
        }

        this.notificationService.showError(errorMessage);
        return throwError(() => error);
      })
    );
  }
}
