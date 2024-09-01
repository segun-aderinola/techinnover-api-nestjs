import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '../users/entities/user.entity';
import { UserService } from 'src/users/users.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as User; // Type assertion
      const user = await this.userService.findUserByEmail(decoded.email);
      if (user.isBanned) {
        return res.status(400).json({
          status: 'error',
          message: 'Your account has been banned. Kindly contact admin',
        });
      }
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unathorized. Kindly login' });
    }
  }
}
