import { Injectable } from '@nestjs/common';
import { User } from '../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/auth/dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findOne(email: string) {
    return this.userModel
      .findOne({
        email: email,
      })
      .exec();
  }

  async create(user: CreateUserDto) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async verifyUser(email: string){
    return this.userModel
      .findOneAndUpdate(
        { email: email },
        { isVerified: true },
        { new: true },
      )
      .exec();
  }
}
