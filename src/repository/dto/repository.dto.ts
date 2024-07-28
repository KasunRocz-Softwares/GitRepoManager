import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRepositoryDto {
  @ApiProperty({ example: 'My Repository' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '/path/to/repository' })
  @IsString()
  @IsNotEmpty()
  path: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  projectId: number;
}
