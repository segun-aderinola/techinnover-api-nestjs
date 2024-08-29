import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';
import { UsersModule } from 'src/modules/users.module';

const routes: Routes = [
  {
    path: '/users',
    module: UsersModule,
  },
];

@Module({
  imports: [RouterModule.forRoutes(routes)],
})
export class UserRoutesModule {}
