import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './modules/users.module';
import { ProductsModule } from './modules/products.module';
import { JwtModule } from '@nestjs/jwt';
// import { AppService } from './app.service';  // Uncomment if AppService is used

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Make sure this points to the correct path of your .env file
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        //const secret = configService.get<string>('JWT_SECRET');
        const jwtSecret = process.env.JWT_SECRET;
        console.log('JWT_SECRET:', jwtSecret); // Add this line to log the secret
        return {
          jwtSecret,
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
    UsersModule,
    ProductsModule,
  ],
  // controllers: [UserController, ProductController], // Typically, controllers are added in feature modules
  // providers: [ProductService, UserService], // Services are typically added in feature modules
})
export class AppModule {}
