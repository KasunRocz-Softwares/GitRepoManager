import { Injectable } from '@nestjs/common';
import simpleGit, { SimpleGit } from 'simple-git';
import { Client } from 'ssh2';

@Injectable()
export class GitService {
  private git: SimpleGit;

  constructor() {
    this.git = simpleGit();
  }

  async listBranches(repositoryPath: string): Promise<string[]> {
    this.git.cwd(repositoryPath);
    const branches = await this.git.branch();
    return branches.all;
  }

  async checkoutBranch(repositoryPath: string, branch: string): Promise<void> {
    this.git.cwd(repositoryPath);
    await this.git.checkout(branch);
  }

  async pull(repositoryPath: string): Promise<void> {
    this.git.cwd(repositoryPath);
    await this.git.pull();
  }

  executeSSHCommand(command: string, host: string, username: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const conn = new Client();
      conn.on('ready', () => {
        conn.exec(command, (err, stream) => {
          if (err) reject(err);
          let data = '';
          stream.on('close', (code, signal) => {
            conn.end();
            resolve(data);
          }).on('data', (chunk) => {
            data += chunk;
          }).stderr.on('data', (chunk) => {
            data += chunk;
          });
        });
      }).connect({
        host: host,
        port: 22,
        username: username,
        password: password,
      });
    });
  }
}
