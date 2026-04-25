import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { Logger } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver(() => LessonType)
export class LessonResolver {
  private logger = new Logger('LessonResolver');
  constructor(private lessonService: LessonService) {}

  @Query(() => [LessonType])
  async lessonAll(): Promise<Lesson[]> {
    return await this.lessonService.getAllLesson();
  }

  @Query(() => LessonType)
  async lesson(@Args('id') id: string): Promise<Lesson> {
    return await this.lessonService.getLesson(id);
  }

  @Mutation(() => LessonType)
  async createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return await this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(() => LessonType)
  async assignStudentsToLesson(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ) {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    this.logger.log(lessonId, studentIds);
    return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
  }
}
