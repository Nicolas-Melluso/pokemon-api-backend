import { Module } from '@nestjs/common';
import { MuseumController } from './museum.controller';
import { MuseumService } from './museum.service';

@Module({
  controllers: [MuseumController],
  providers: [MuseumService]
})
export class MuseumModule {}
