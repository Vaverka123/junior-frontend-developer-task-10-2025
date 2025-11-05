import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  title = 'junior-frontend-developer-task';

  protected tasks = [
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
  protected descVisible: boolean = false;

  toggleCompleted(task: any) {
    task.status = task.status === 'Completed' ? 'Planned' : 'Completed';
  }

  toggleDescription(task: any) {
    task.descVisible = !task.descVisible;
  }
}
