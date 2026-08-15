import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

export enum TaskStatus {
  TODO = 'To Do',
  DOING = 'Doing',
  COMPLETED = 'Completed',
  ON_HOLD = 'On Hold',
}

export enum TaskPriority {
  NONE = 'No Priority',
  URGENT = 'Urgent',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus;

  @Prop({ enum: TaskPriority, default: TaskPriority.NONE })
  priority: TaskPriority;

  @Prop()
  assignee?: string;

  @Prop()
  dueDate?: string;

  @Prop([String])
  labels?: string[];

  @Prop()
  subtasks?: any[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
