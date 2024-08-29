import { Routes } from '@nestjs/core';
import { UsersModule } from '../modules/users.module';
import { ProductsModule } from '../modules/products.module';

export const appRoutes: Routes = [
  {
    path: 'users',
    module: UsersModule,
  },
  {
    path: 'products',
    module: ProductsModule,
  },
];
