import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangePipe } from './pipes/range.pipe';
import { NotificationComponent } from './components/notification/notification.component';
import { HeaderComponent } from './components/notification/header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RangePipe, HeaderComponent, NotificationComponent],
  imports: [CommonModule, RouterModule],
  exports: [
    RangePipe,
    NotificationComponent,
    HeaderComponent,
    CommonModule,
    RouterModule,
  ],
})
export class SharedModule {}
