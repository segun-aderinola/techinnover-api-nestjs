import { Module } from '@nestjs/common';
import { UserService } from '../services/users.service';
import { UserController } from '../controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { UserRoutesModule } from '../routes/users.routes';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserRoutesModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UsersModule {}
