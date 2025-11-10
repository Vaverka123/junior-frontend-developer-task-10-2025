import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  @Input() tasks!: Task[];
  @Output() toggleCompleted = new EventEmitter<Task>();
  @Output() toggleDescription = new EventEmitter<Task>();
  @Output() removeTask = new EventEmitter<Task>();
}
