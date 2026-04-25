/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Student')
export class StudentType {
  @Field((type) => ID)
  id!: string;

  @Field()
  firstName!: string;

  @Field({ nullable: true })
  lastName?: string;
}
