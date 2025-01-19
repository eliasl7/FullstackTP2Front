import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangePipe } from './pipes/range.pipe';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [RangePipe, ModalComponent],
  imports: [CommonModule],
  exports: [RangePipe, ModalComponent, CommonModule],
})
export class SharedModule {}
