import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { Lesson } from './lesson.entity';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver(() => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}

  @Query(() => LessonType)
  async lesson(@Args('id') id: string): Promise<Lesson> {
    return await this.lessonService.getLesson(id);
  }

  @Mutation(() => LessonType)
  async createLesson(
    @Args('name') name: string,
    @Args('startDate') startDate: string,
    @Args('endDate', { nullable: true }) endDate: string,
  ) {
    return await this.lessonService.createLesson(name, startDate, endDate);
  }
}
