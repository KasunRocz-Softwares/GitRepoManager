import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { GitService } from './git.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('git')
export class GitController {
  constructor(private readonly gitService: GitService) {
  }

  @Get('branches')
  @ApiOperation({ summary: 'List all branches' })
  @ApiResponse({ status: 200, description: 'List of branches', type: [String] })
  async listBranches() {
    return await this.gitService.listBranches();
  }

  @Post('checkout')
  @ApiOperation({ summary: 'Checkout a branch' })
  @ApiResponse({ status: 200, description: 'Branch checked out' })
  async checkoutBranch(@Body('branch') branch: string) {
    await this.gitService.checkoutBranch(branch);
  }

  @Post('pull')
  @ApiOperation({ summary: 'Pull latest changes' })
  @ApiResponse({ status: 200, description: 'Pulled latest changes' })
  async pull() {
    await this.gitService.pull();
  }

  @Post('ssh-command')
  @ApiOperation({ summary: 'Execute SSH command' })
  @ApiResponse({ status: 200, description: 'SSH command output', type: String })
  executeSSHCommand(
    @Body('command') command: string,
    @Body('host') host: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<string> {
    return this.gitService.executeSSHCommand(command, host, username, password);
  }

  // Add a route to render the index page
  @Get('/')
  @Render('index')
  root() {
    return {};
  }
}
