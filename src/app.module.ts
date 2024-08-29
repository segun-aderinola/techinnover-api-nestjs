import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';
import { UserController } from './controllers/users.controller';
import { ProductController } from './controllers/products.controller';
// import { AppService } from './app.service';
import { UserService } from './services/users.service';
import { ProductService } from './services/products.service';
import { UsersModule } from './modules/users.module';
import { ProductsModule } from './modules/products.module';

@Module({
  imports: [
    // ConfigModule.forRoot({ isGlobal: true }),
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
  controllers: [UserController, ProductController],
  providers: [ProductService, UserService],
})
export class AppModule {}
