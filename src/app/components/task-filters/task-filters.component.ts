import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'task-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-filters.component.html',
})
export class TaskFiltersComponent {
  @Input() filters!: { name: string; date: string; status: string };
  @Output() filtersChange = new EventEmitter();

  update() {
    this.filtersChange.emit(this.filters);
  }
}
