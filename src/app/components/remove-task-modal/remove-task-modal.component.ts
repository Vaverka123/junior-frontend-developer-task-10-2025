import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'remove-task-modal',
  standalone: true,
  templateUrl: './remove-task-modal.component.html',
})
export class RemoveTaskModalComponent {
  @Input() taskToRemove?: Task;
  @Output() confirmRemove = new EventEmitter<Task>();

  onConfirm(): void {
    if (this.taskToRemove) {
      this.confirmRemove.emit(this.taskToRemove);
    }
  }
}
