import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() toggleCompleted = new EventEmitter<Task>();
  @Output() toggleDescription = new EventEmitter<Task>();
}
