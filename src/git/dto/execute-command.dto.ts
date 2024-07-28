import { ApiProperty } from '@nestjs/swagger';

export class ExecuteCommandDto {
  @ApiProperty({ description: 'Command to execute' })
  command: string;

  @ApiProperty({ description: 'Host address' })
  host: string;

  @ApiProperty({ description: 'Username for SSH' })
  username: string;

  @ApiProperty({ description: 'Private key for SSH' })
  privateKey: string;
}
