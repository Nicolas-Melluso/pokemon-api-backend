import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { MuseumModule } from './museum/museum.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PokemonModule,
    UserModule,
    MuseumModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/poke'),
  ],
})
export class AppModule {}
