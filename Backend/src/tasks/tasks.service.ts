import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto) {
    const created = new this.taskModel(createTaskDto);
    return created.save();
  }

  async findAll(query?: any) {
    const filter: any = {};
    if (query?.search) {
      const regex = new RegExp(query.search, 'i');
      filter.$or = [{ title: regex }, { description: regex }];
    }
    if (query?.status) filter.status = query.status;
    if (query?.priority) filter.priority = query.priority;
    return this.taskModel.find(filter).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string) {
    const task = await this.taskModel.findById(id).exec();
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const updated = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Task not found');
    return updated;
  }

  async remove(id: string) {
    const res = await this.taskModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Task not found');
    return { deleted: true };
  }

  async updateStatus(id: string, status: string) {
    const updated = await this.taskModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
    if (!updated) throw new NotFoundException('Task not found');
    return updated;
  }

  async updatePriority(id: string, priority: string) {
    const updated = await this.taskModel.findByIdAndUpdate(id, { priority }, { new: true }).exec();
    if (!updated) throw new NotFoundException('Task not found');
    return updated;
  }
}
