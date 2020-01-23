import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { todoSchema } from './schema/todo.schema';
import { TodoController } from './controllers/todo/todo.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        ssl: true,
      }),
    MongooseModule.forFeature([
      {
        name: 'todo',
        schema: todoSchema,
      },
    ]),
  ],
  controllers: [
    AppController,
    TodoController,
  ],
  providers: [

  ],
})
export class AppModule {
}
