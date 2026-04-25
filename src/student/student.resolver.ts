import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => [StudentType])
  async getStudents(): Promise<Student[]> {
    return await this.studentService.getStudents();
  }

  @Query(() => StudentType)
  async getStudent(@Args('id') id: string): Promise<Student> {
    return await this.studentService.getStudent(id);
  }

  @Mutation(() => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<StudentType> {
    return await this.studentService.createStudent(createStudentInput);
  }
}
