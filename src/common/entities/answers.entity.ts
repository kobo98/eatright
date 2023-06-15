import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Answers {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  userId: string;

  @Column()
  medicalConditions: string;

  @Column()
  intolerances: string;

  @Column()
  diet: string;

  @Column()
  healthGoals: string;

  @Column()
  budget: number;

  @Column()
  datetime: Date;

  @Column()
  numeric_id?: number;
}
