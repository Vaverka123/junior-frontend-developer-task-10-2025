import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from './models/task.model';
import { AddTaskModalComponent } from './components/add-task-modal/add-task-modal.component';
import { TaskFiltersComponent } from './components/task-filters/task-filters.component';
import { TaskGroupComponent } from './components/task-group/task-group.component';
import { RemoveTaskModalComponent } from './components/remove-task-modal/remove-task-modal.component';

declare var bootstrap: any;

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    TaskFiltersComponent,
    TaskGroupComponent,
    AddTaskModalComponent,
    RemoveTaskModalComponent,
  ],
  templateUrl: './app.component.html',
  standalone: true,
})
export class AppComponent {
  title = 'Lista zadań';

  tasks: Task[] = [
    {
      name: 'Zrobić zakupy spożywcze',
      status: 'Completed',
      date: '2025-05-01',
      description: 'Muszę kupić mleko, mąkę i jajka.',
      descVisible: false,
    },
    {
      name: 'Opłacić rachunki',
      status: 'Pending',
      date: '2025-05-10',
      description: 'Tylko nie odkładaj tego na inny dzień!',
      descVisible: false,
    },
    {
      name: 'Urodziny mamy',
      status: 'Planned',
      date: '2025-05-15',
      description: 'Kupić kwiaty i tort.',
      descVisible: false,
    },
  ];

  selectedTaskToRemove?: Task;

  openRemoveModal(task: Task): void {
    this.selectedTaskToRemove = task;
    const modalEl = document.getElementById('removeTaskModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  removeTask(task: Task): void {
    this.tasks = this.tasks.filter((t) => t !== task);

    const modalEl = document.getElementById('removeTaskModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) {
        modal.hide();
      }
    }
  }

  filters = {
    name: '',
    date: '',
    status: '',
  };

  newTask: Task = {
    name: '',
    date: '',
    status: 'Pending',
    description: '',
  };

  toggleCompleted(task: Task) {
    task.status = task.status === 'Completed' ? 'Pending' : 'Completed';
  }

  toggleDescription(task: Task) {
    task.descVisible = !task.descVisible;
  }

  get filteredTasks(): Task[] {
    return this.tasks
      .filter((task) => {
        const matchesName = this.filters.name
          ? task.name.toLowerCase().includes(this.filters.name.toLowerCase())
          : true;
        const matchesDate = this.filters.date
          ? task.date === this.filters.date
          : true;
        const matchesStatus = this.filters.status
          ? task.status === this.filters.status
          : true;
        return matchesName && matchesDate && matchesStatus;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
      });
  }

  addTask(task: Task) {
    if (!task.name || !task.date) return;

    this.tasks.push({
      ...task,
      descVisible: false,
    });

    const modalEl = document.getElementById('addTaskModal');
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl!);
    modalInstance.hide();
  }
}
