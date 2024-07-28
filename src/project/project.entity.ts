import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Repository } from '../repository/repository.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sshHost: string;

  @Column()
  sshUsername: string;

  @Column()
  sshPassword: string;

  @ManyToOne(() => User, user => user.projects)
  user: User;

  @OneToMany(() => Repository, repository => repository.project)
  repositories: Repository[];
}
