import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'add-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task-modal.component.html',
})
export class AddTaskModalComponent {
  @Output() addTask = new EventEmitter<Task>();

  newTask: Task = {
    name: '',
    date: '',
    status: 'Planned',
    description: '',
  };

  minDate = new Date().toISOString().split('T')[0];

  onSubmit(form: any) {
    if (form.valid) {
      this.addTask.emit({ ...this.newTask });
      this.newTask = { name: '', date: '', status: 'Planned', description: '' };
    }
  }
}
