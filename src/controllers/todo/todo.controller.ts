import { BadRequestException, Body, Controller, Get, HttpStatus, InternalServerErrorException, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITodo } from '../../models/todo.model';

@Controller('todo')
export class TodoController {
  constructor(@InjectModel('todo') private readonly todoModel: Model<ITodo>) {
  }

  @Post('')
  protected async create(@Body('document') doc: ITodo): Promise<{ status: number, id?: string }> {
    // if required fields are not in object reject it
    if (!('name' in doc) || !('priority' in doc)) {
      throw new BadRequestException({status: HttpStatus.BAD_REQUEST});
    }

    // create todo
    const todo = new this.todoModel(doc);

    // save it
    if (await todo.save()) {
      return {status: HttpStatus.CREATED, id: todo._id};
    }
    // save failed
    throw new BadRequestException({status: HttpStatus.BAD_REQUEST});
  }

  @Get('/:id')
  protected async getById(@Param('id') id: string) {
    let doc;
    try {
      doc = await this.todoModel.findById(id).exec();
      return doc;
    } catch (e) {
      throw new BadRequestException({status: HttpStatus.BAD_REQUEST});
    }
  }

  @Get('')
  protected async getAll() {
    let docs;
    try {
      docs = await this.todoModel.find({}).exec();
      return docs;
    } catch (e) {
      throw new InternalServerErrorException({status: HttpStatus.INTERNAL_SERVER_ERROR, message: e.message});
    }
  }
}
