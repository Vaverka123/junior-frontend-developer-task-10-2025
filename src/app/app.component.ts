import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from './models/task.model';
import { AddTaskModalComponent } from './components/add-task-modal/add-task-modal.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFiltersComponent } from './components/task-filters/task-filters.component';

declare var bootstrap: any;

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    TaskFiltersComponent,
    TaskListComponent,
    AddTaskModalComponent,
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

  get groupedTasks(): { [key: string]: Task[] } {
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    const groups: { [key: string]: Task[] } = {
      Przeszłe: [],
      Dzisiaj: [],
      Jutro: [],
      'W tym tygodniu': [],
      Przyszłe: [],
    };

    this.filteredTasks.forEach((task) => {
      const date = new Date(task.date);
      const taskDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

      if (taskDate < startOfToday) {
        groups['Przeszłe'].push(task);
      } else if (taskDate >= startOfToday && taskDate < endOfToday) {
        groups['Dzisiaj'].push(task);
      } else if (
        taskDate >= endOfToday &&
        taskDate <
          new Date(
            endOfToday.getFullYear(),
            endOfToday.getMonth(),
            endOfToday.getDate() + 1
          )
      ) {
        groups['Jutro'].push(task);
      } else if (taskDate >= startOfWeek && taskDate <= endOfWeek) {
        groups['W tym tygodniu'].push(task);
      } else {
        groups['Przyszłe'].push(task);
      }
    });

    return groups;
  }

  getGroupNames(groups: { [key: string]: Task[] }): string[] {
    return Object.keys(groups).filter((key) => groups[key].length > 0);
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
