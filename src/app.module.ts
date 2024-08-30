import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './modules/users.module';
import { ProductsModule } from './modules/products.module';
// import { AppService } from './app.service';  // Uncomment if AppService is used

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
