export interface Task {
  name: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Planned';
  description: string;
  descVisible?: boolean;
}
