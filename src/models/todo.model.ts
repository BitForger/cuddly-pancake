import {Document} from 'mongoose';

class Todo {
  name: string;
  priority: string;
  constructor(json: {
    name: string,
    priority: string;
  }) {
    this.name = json.name;
    this.priority = json.priority;
  }
}

export interface ITodo extends Todo, Document {
}
