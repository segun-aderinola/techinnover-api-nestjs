import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';
import { ProductsModule } from './products.module';
import { UsersModule } from './users.module';

const routes: Routes = [
  {
    path: 'users',
    module: UsersModule,
  },
  {
    path: 'products',
    module: ProductsModule,
  },
];

@Module({
  imports: [RouterModule.forRoutes(routes), UsersModule, ProductsModule],
})
export class AppModule {}
