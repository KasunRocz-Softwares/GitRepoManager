import { ApiProperty } from '@nestjs/swagger';

export class CheckoutBranchDto {
  @ApiProperty({ description: 'Branch name' })
  branch: string;
}
