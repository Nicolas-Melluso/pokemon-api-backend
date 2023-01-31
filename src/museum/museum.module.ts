import { Module } from '@nestjs/common';
import { MuseumController } from './museum.controller';
import { MuseumService } from './museum.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Museum, MuseumSchema } from './model/museum.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Museum.name, schema: MuseumSchema }]),
  ],
  controllers: [MuseumController],
  providers: [MuseumService],
})
export class MuseumModule {}
