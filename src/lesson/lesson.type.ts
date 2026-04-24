/* eslint-disable @typescript-eslint/no-unused-vars */
import { ID, ObjectType, Field } from '@nestjs/graphql';

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
}
