import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  private logger = new Logger('Lesson Service');
  constructor(
    @InjectRepository(Lesson)
    private repo: Repository<Lesson>,
  ) {}

  async getAllLesson(): Promise<Lesson[]> {
    return await this.repo.find();
  }

  async getLesson(id: string): Promise<Lesson> {
    const found = await this.repo.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate } = createLessonInput;
    const lesson = this.repo.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students: [],
    });

    return this.repo.save(lesson);
  }

  async assignStudentsToLesson(
    lessonId: string,
    studentIds: string[],
  ): Promise<Lesson> {
    const lesson = await this.repo.findOne({ where: { id: lessonId } });
    this.logger.log(lesson);

    if (!lesson) {
      throw new NotFoundException();
    }

    this.logger.log(lesson);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const combinedIds = [...lesson.students, ...studentIds];
    lesson.students = Array.from(new Set(combinedIds));

    return this.repo.save(lesson);
  }
}
