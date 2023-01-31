import { ApiProperty } from '@nestjs/swagger';

export class CreateMuseumDTO {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly trunk: number[];
  @ApiProperty()
  readonly owner: string;
}
