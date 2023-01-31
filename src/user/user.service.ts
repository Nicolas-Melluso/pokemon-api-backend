import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDTO } from './dto/user.dto';
import { User, UserDocument } from './model/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUsers(): Promise<UserDocument[]> {
    const users = await this.userModel.find();
    return users;
  }

  async getUsersById(userIdParam: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userIdParam);
    return user;
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<UserDocument> {
    const newUser = new this.userModel(createUserDTO);
    return await newUser.save();
  }

  async updateUserById(
    createUserDTO: CreateUserDTO,
    userIdParam: string,
  ): Promise<UserDocument> {
    const updateUser = await this.userModel.findByIdAndUpdate(
      userIdParam,
      createUserDTO,
      { new: true },
    );
    return updateUser;
  }

  async deleteUserById(userIdParam: string): Promise<UserDocument> {
    const deleteUser = await this.userModel.findByIdAndDelete(userIdParam);
    return deleteUser;
  }
}
