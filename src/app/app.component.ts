import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  name: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Planned';
  description: string;
  descVisible?: boolean;
}

declare var bootstrap: any;

@Component({
  selector: 'app-root',
  imports: [NgClass, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  title = 'junior-frontend-developer-task';

  minDate: string;

  constructor() {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

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

  filteredTasks(): Task[] {
    return this.tasks.filter((task) => {
      const matchesName = task.name
        .toLowerCase()
        .includes(this.filters.name.toLowerCase());
      const matchesDate = !this.filters.date || task.date === this.filters.date;
      const matchesStatus =
        !this.filters.status || task.status === this.filters.status;

      return matchesName && matchesDate && matchesStatus;
    });
  }

  addTask() {
    if (!this.newTask.name || !this.newTask.date) return;

    this.tasks.push({
      ...this.newTask,
      descVisible: false,
    });

    const modalEl = document.getElementById('addTaskModal');
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl!);
    modalInstance.hide();

    modalEl!.addEventListener(
      'hidden.bs.modal',
      () => {
        this.newTask = {
          name: '',
          date: '',
          status: 'Planned',
          description: '',
        };
      },
      { once: true }
    );
  }
}
