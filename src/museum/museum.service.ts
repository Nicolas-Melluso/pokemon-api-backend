import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMuseumDTO } from './dto/museum.dto';
import { Museum, MuseumDocument } from './model/museum.model';

@Injectable()
export class MuseumService {
  constructor(
    @InjectModel(Museum.name) private museumModel: Model<MuseumDocument>,
  ) {}
  async getMuseums(): Promise<MuseumDocument[]> {
    const museum = await this.museumModel.find();
    return museum;
  }
  async getMuseumById(museumId: string): Promise<MuseumDocument> {
    const museum = await this.museumModel.findById(museumId);
    return museum;
  }
  async createMuseum(
    createMuseumDTO: CreateMuseumDTO,
  ): Promise<MuseumDocument> {
    const newMuseum = new this.museumModel(createMuseumDTO);
    return await newMuseum.save();
  }

  async updatemuseumById(
    createMuseumDTO: CreateMuseumDTO,
    museumIdParam: string,
  ): Promise<MuseumDocument> {
    const updateMuseum = await this.museumModel.findByIdAndUpdate(
      museumIdParam,
      createMuseumDTO,
      { new: true },
    );
    return updateMuseum;
  }
  async deleteMuseumById(museumIdParam: string): Promise<MuseumDocument> {
    const deleteMuseum = await this.museumModel.findByIdAndDelete(
      museumIdParam,
    );
    return deleteMuseum;
  }
}
