import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  pokemonTrunks: string[];
}
