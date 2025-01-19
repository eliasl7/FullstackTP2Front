import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangePipe } from './pipes/range.pipe';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [RangePipe, NotificationComponent],
  imports: [CommonModule],
  exports: [RangePipe, NotificationComponent, CommonModule],
})
export class SharedModule {}
