import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'Local Server' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '192.168.8.193' })
  @IsString()
  @IsNotEmpty()
  sshHost: string;

  @ApiProperty({ example: 'root' })
  @IsString()
  @IsNotEmpty()
  sshUsername: string;

  @ApiProperty({ example: 'Kasun0801' })
  @IsString()
  @IsNotEmpty()
  sshPassword: string;
}
