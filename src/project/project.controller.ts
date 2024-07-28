import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/project.dto';
import { Repository } from '../repository/repository.entity';
import { RepositoryService } from '../repository/repository.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly repositoryService: RepositoryService,
  ) {
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'List of projects', type: [Project] })
  findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  @ApiResponse({ status: 200, description: 'Project details', type: Project })
  @ApiResponse({ status: 404, description: 'Project not found' })
  findOne(@Param('id') id: number): Promise<Project> {
    return this.projectService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, description: 'Project created', type: Project })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectService.create(createProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project by ID' })
  @ApiResponse({ status: 204, description: 'Project deleted' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  remove(@Param('id') id: number): Promise<void> {
    return this.projectService.remove(id);
  }

  @Get(':id/repositories')
  @ApiOperation({ summary: 'Get repositories by project ID' })
  @ApiResponse({
    status: 200,
    description: 'List of repositories for the specified project',
    type: [Repository],
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  findRepositories(@Param('id') id: number): Promise<Repository[]> {
    return this.repositoryService.findByProject(id);
  }
}
