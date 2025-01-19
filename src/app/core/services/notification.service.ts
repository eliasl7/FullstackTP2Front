import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  notifications$ = this.notificationSubject.asObservable();

  showError(message: string): void {
    this.notificationSubject.next({ message, type: 'error' });
  }

  showSuccess(message: string): void {
    this.notificationSubject.next({ message, type: 'success' });
  }
}
