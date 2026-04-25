import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';
import { Logger } from '@nestjs/common';
import { StudentType } from './student.type';

@Injectable()
export class StudentService {
  private logger = new Logger('StudentService');

  constructor(
    @InjectRepository(Student)
    private repo: Repository<Student>,
  ) {}

  async getStudents(): Promise<Student[]> {
    this.logger.log(this.repo.find());
    return await this.repo.find();
  }

  async getStudent(id: string): Promise<Student> {
    let found: Student | null;

    //Notes: try catch utk ke db kedepannya gaperlu karna dah di handle nestjs & typeORM
    try {
      found = await this.repo.findOne({ where: { id } });

      //   // bad practice (nanti ujung" nya catch error luar nge throw error lagi)
      //   if (!found) {
      //     throw new NotFoundException();
      //   }
      //   return found;
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.error('issue', error.stack);
      throw new BadRequestException();
    }

    this.logger.log(found);

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<StudentType> {
    const { firstName, lastName } = createStudentInput;

    const student = {
      id: uuid(),
      firstName,
      lastName,
    };

    try {
      await this.repo.save(student);
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.error('error submit', error.stack);
      throw new BadRequestException();
    }

    return student;
  }
}
