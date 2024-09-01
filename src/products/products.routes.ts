import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';
import { ProductsModule } from 'src/products/products.module';

const routes: Routes = [
  {
    path: '/products',
    module: ProductsModule,
  },
];

@Module({
  imports: [RouterModule.forRoutes(routes)],
})
export class UserRoutesModule {}
