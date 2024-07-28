import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Index } from 'typeorm';
import { Project } from '../project/project.entity';
import { IsString, IsNotEmpty, IsIn } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['admin', 'qa', 'dev'])
  @Column()
  role: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  password: string;

  @OneToMany(() => Project, project => project.user)
  projects: Project[];
}
