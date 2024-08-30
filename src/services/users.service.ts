import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../models/user.entity';
import * as bcrypt from 'bcrypt';
import { ValidateSignUpPayload } from 'src/validators/userSignUp.validate';
import {
  ApiResponse,
  errorResponse,
  successResponse,
} from 'src/utils/response.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(
    userPayload: ValidateSignUpPayload,
  ): Promise<ApiResponse<User> | ApiResponse<null>> {
    const existingUser = await this.userRepository.findOne({
      where: { email: userPayload.email },
    });
    if (existingUser) {
      return errorResponse('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(userPayload.password, 10);
    const user = this.userRepository.create({
      name: userPayload.name,
      email: userPayload.email,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user); // Await the save operation

    if (savedUser) {
      return successResponse('User registered successfully', savedUser);
    }

    return errorResponse('User registration failed');
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async banUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.isBanned = true;
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
