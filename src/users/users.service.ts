import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ValidateSignUpPayload } from 'src/users/dto/user-signup-payload';
import { errorResponse, successResponse } from 'src/utils/response.util';

@Injectable()
export class UserService {
  findUserById(sub: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(
    userPayload: ValidateSignUpPayload,
    res: Response,
  ): Promise<void> {
    // Change the return type to `void` since we're handling the response directly
    const existingUser = await this.userRepository.findOne({
      where: { email: userPayload.email },
    });

    if (existingUser) {
      return errorResponse(res, 'Email already in use'); // Pass `res` to `errorResponse`
    }

    const hashedPassword = await bcrypt.hash(userPayload.password, 10);
    const user = this.userRepository.create({
      name: userPayload.name,
      email: userPayload.email,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user); // Await the save operation

    if (savedUser) {
      return successResponse(res, 'User registered successfully', savedUser); // Pass `res` to `successResponse`
    }

    return errorResponse(res, 'User registration failed'); // Pass `res` to `errorResponse`
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async banAndUnbanUser(
    userId: number,
    action: string,
    res: Response,
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      return errorResponse(res, 'User not found');
    }
    if (action == 'ban') {
      user.isBanned = true;
    } else {
      user.isBanned = false;
    }
    await this.userRepository.save(user);
  }

  async unbanUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.isBanned = false;
    await this.userRepository.save(user);
  }
}
