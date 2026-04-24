import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private repo: Repository<Lesson>,
  ) {}

  async getLesson(id: string): Promise<Lesson> {
    const found = await this.repo.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async createLesson(
    name: string,
    startDate: string,
    endDate: string,
  ): Promise<Lesson> {
    const lesson = this.repo.create({
      id: uuid(),
      name,
      startDate,
      endDate,
    });

    return this.repo.save(lesson);
  }
}
