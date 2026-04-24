import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Lesson {
  @ObjectIdColumn()
  _id!: string;

  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  startDate?: string;

  @Column({ nullable: true })
  endDate?: string;
}
