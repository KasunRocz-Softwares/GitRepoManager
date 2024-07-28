import { Body, Controller, Post, NotFoundException } from '@nestjs/common';
import { GitService } from './git.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { RepositoryService } from '../repository/repository.service';

@ApiTags('git')
@Controller('git')
export class GitController {
  constructor(
    private readonly gitService: GitService,
    private readonly repositoryService: RepositoryService,
  ) {}

  async getRepositoryPath(repositoryId: number): Promise<string> {
    const repository = await this.repositoryService.findOne(repositoryId);
    if (!repository) {
      throw new NotFoundException('Repository not found');
    }
    return repository.path;
  }

  @Post('branches')
  @ApiBody({
    description: 'Get a list of branches for a specific repository',
    examples: {
      example: {
        summary: 'Example input',
        value: { repositoryId: 1 },
      },
    },
  })
  async listBranches(@Body('repositoryId') repositoryId: number): Promise<string[]> {
    const repositoryPath = await this.getRepositoryPath(repositoryId);
    return this.gitService.listBranches(repositoryPath);
  }

  @Post('checkout')
  @ApiBody({
    description: 'Checkout a specific branch',
    examples: {
      example: {
        summary: 'Example input',
        value: {
          repositoryId: 1,
          branch: 'feature/new-branch',
        },
      },
    },
  })
  async checkoutBranch(
    @Body('repositoryId') repositoryId: number,
    @Body('branch') branch: string,
  ): Promise<void> {
    const repositoryPath = await this.getRepositoryPath(repositoryId);
    return this.gitService.checkoutBranch(repositoryPath, branch);
  }

  @Post('pull')
  @ApiBody({
    description: 'Pull the latest changes from the remote repository',
    examples: {
      example: {
        summary: 'Example input',
        value: { repositoryId: 1 },
      },
    },
  })
  async pull(@Body('repositoryId') repositoryId: number): Promise<void> {
    const repositoryPath = await this.getRepositoryPath(repositoryId);
    return this.gitService.pull(repositoryPath);
  }

  @Post('ssh-command')
  @ApiBody({
    description: 'Execute a command over SSH',
    examples: {
      example: {
        summary: 'Example input',
        value: {
          command: 'ls -al',
          host: '192.168.1.1',
          username: 'root',
          password: 'password123',
        },
      },
    },
  })
  async executeSSHCommand(
    @Body('command') command: string,
    @Body('host') host: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<string> {
    return this.gitService.executeSSHCommand(command, host, username, password);
  }
}
