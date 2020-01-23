import { Schema } from 'mongoose';

export const todoSchema = new Schema({
  name: String,
  priority: String,
});
