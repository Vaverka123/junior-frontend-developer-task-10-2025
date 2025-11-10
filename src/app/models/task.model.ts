export interface Task {
  name: string;
  date: string | Date;
  status: 'Completed' | 'Pending' | 'Planned';
  description: string;
  descVisible?: boolean;
}
