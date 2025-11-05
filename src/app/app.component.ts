import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  name: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Planned';
  description: string;
  descVisible?: boolean;
}

@Component({
  selector: 'app-root',
  imports: [NgClass, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  title = 'junior-frontend-developer-task';

  protected tasks: Task[] = [
    {
      id: 1,
      name: 'Zrobić zakupy spożywcze',
      status: 'Completed',
      date: '2025-05-01',
      description: 'Muszę kupić mleko, mąkę i jajka.',
      descVisible: false,
    },
    {
      id: 2,
      name: 'Opłacić rachunki',
      status: 'Pending',
      date: '2025-05-10',
      description: 'Tylko nie odkładaj tego na inny dzień!',
      descVisible: false,
    },
    {
      id: 3,
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

  toggleCompleted(task: Task) {
    task.status = task.status === 'Completed' ? 'Planned' : 'Completed';
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
}
