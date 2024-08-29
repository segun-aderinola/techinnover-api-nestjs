import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { appRoutes } from './app.routes';
import { UsersModule } from '../modules/users.module';
import { ProductsModule } from '../modules/products.module';

@Module({
  imports: [RouterModule.register(appRoutes), UsersModule, ProductsModule],
})
export class RoutesModule {}
