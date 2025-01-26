import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ActivitiesModule } from './modules/activities/activities.module';
// import { ModulesController } from './activities/modules/modules.controller';
import { ActivitiesController } from './modules/activities/activities.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule, // Add PrismaModule here
    UsersModule,
    AuthModule,
    ActivitiesModule,
  ],
  controllers: [ActivitiesController],
})
export class AppModule {}
