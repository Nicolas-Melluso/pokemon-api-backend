import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
<<<<<<< HEAD
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
=======

@Module({
>>>>>>> 00e5a072ab8ac7c2fd292546dd640cdce5731eb0
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
