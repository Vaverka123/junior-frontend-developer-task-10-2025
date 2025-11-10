import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskListComponent } from '../task-list/task-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'task-group',
  templateUrl: './task-group.component.html',
  imports: [TaskListComponent, CommonModule],
  standalone: true,
})
export class TaskGroupComponent {
  @Input() tasks: Task[] = [];
  @Output() toggleCompleted = new EventEmitter<Task>();
  @Output() toggleDescription = new EventEmitter<Task>();
  @Output() removeTask = new EventEmitter<Task>();

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
    startOfWeek.setDate(
      startOfWeek.getDate() -
        (startOfWeek.getDay() === 0 ? 6 : startOfWeek.getDay() - 1)
    );
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    const groups: { [key: string]: Task[] } = {
      Przeszłe: [],
      Dzisiaj: [],
      Jutro: [],
      'W tym tygodniu': [],
      Przyszłe: [],
    };

    this.tasks.forEach((task) => {
      const date = new Date(task.date);
      const taskDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

      if (taskDate < startOfToday) groups['Przeszłe'].push(task);
      else if (taskDate >= startOfToday && taskDate < endOfToday)
        groups['Dzisiaj'].push(task);
      else if (
        taskDate >= endOfToday &&
        taskDate <
          new Date(
            endOfToday.getFullYear(),
            endOfToday.getMonth(),
            endOfToday.getDate() + 1
          )
      )
        groups['Jutro'].push(task);
      else if (taskDate >= startOfWeek && taskDate <= endOfWeek)
        groups['W tym tygodniu'].push(task);
      else groups['Przyszłe'].push(task);
    });

    return groups;
  }

  getGroupNames(groups: { [key: string]: Task[] }): string[] {
    return Object.keys(groups).filter((key) => groups[key].length > 0);
  }
}
