import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePokemonDTO {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly type: string[];
  @ApiProperty()
  readonly imageURL: string;
  @ApiProperty()
  readonly pokedexId: number;
  @ApiPropertyOptional()
  readonly level?: number;
  @ApiPropertyOptional()
  readonly height: number;
  @ApiPropertyOptional()
  readonly weight: number;
  @ApiPropertyOptional()
  readonly levelRate?: number;
}
