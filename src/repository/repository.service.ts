import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as Repo } from 'typeorm';
import { Repository } from './repository.entity';
import { CreateRepositoryDto } from './dto/repository.dto';
import { Project } from '../project/project.entity';

@Injectable()
export class RepositoryService {
  constructor(
    @InjectRepository(Repository)
    private repositoryRepository: Repo<Repository>,
    @InjectRepository(Project)
    private projectRepository: Repo<Project>,
  ) {}

  async create(createRepositoryDto: CreateRepositoryDto): Promise<Repository> {
    const project = await this.projectRepository.findOne({ where: { id: createRepositoryDto.projectId } });
    if (!project) {
      throw new Error('Project not found');
    }
    const repository = this.repositoryRepository.create({
      ...createRepositoryDto,
      project,
    });
    return this.repositoryRepository.save(repository);
  }

  async findAll(): Promise<Repository[]> {
    return this.repositoryRepository.find({ relations: ['project'] });
  }

  async findOne(id: number): Promise<Repository> {
    return this.repositoryRepository.findOne({
      where: { id },
      relations: ['project'],
    });
  }

  async findByProject(projectId: number): Promise<Repository[]> {
    return this.repositoryRepository.find({
      where: { project: { id: projectId } },
      relations: ['project'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.repositoryRepository.delete(id);
  }
}
