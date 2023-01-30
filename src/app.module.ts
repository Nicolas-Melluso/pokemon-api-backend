import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon/pokemon.controller';
import { PokemonService } from './pokemon/pokemon.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { MuseumModule } from './museum/museum.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MuseumController } from './museum/museum.controller';
import { MuseumService } from './museum/museum.service';

@Module({
  imports: [PokemonModule, UserModule, MuseumModule],
  controllers: [PokemonController, UserController, MuseumController],
  providers: [PokemonService, UserService, MuseumService],
})
export class AppModule {}
