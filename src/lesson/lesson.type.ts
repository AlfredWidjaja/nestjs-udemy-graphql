/* eslint-disable @typescript-eslint/no-unused-vars */
import { ID, ObjectType, Field } from '@nestjs/graphql';
import { StudentType } from 'src/student/student.type';

@ObjectType()
export class LessonType {
  @Field((type) => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  startDate?: string;

  @Field({ nullable: true })
  endDate?: string;

  @Field(() => [StudentType])
  students?: string[];
}
