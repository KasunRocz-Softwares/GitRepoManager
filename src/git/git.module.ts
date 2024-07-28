import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GitController } from './git.controller';
import { GitService } from './git.service';
import { RepositoryModule } from '../repository/repository.module';
import { Repository } from '../repository/repository.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Repository]),
    RepositoryModule,
  ],
  controllers: [GitController],
  providers: [GitService],
})
export class GitModule {}
