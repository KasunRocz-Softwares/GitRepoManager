import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { Repository } from './repository.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRepositoryDto } from './dto/repository.dto';

@ApiTags('repositories')
@Controller('repositories')
export class RepositoryController {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Get()
  findAll(): Promise<Repository[]> {
    return this.repositoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Repository> {
    return this.repositoryService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new repository' })
  @ApiResponse({ status: 201, description: 'Repository created', type: Repository })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createRepositoryDto: CreateRepositoryDto): Promise<Repository> {
    return this.repositoryService.create(createRepositoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.repositoryService.remove(id);
  }

  @Get(':id/repositories')
  findRepositories(@Param('id') id: number): Promise<Repository[]> {
    return this.repositoryService.findByProject(id);
  }
}
