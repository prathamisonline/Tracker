// import { Module } from '@nestjs/common';
// import { ActivitiesController } from './activities.controller';

// @Module({
//     controllers:[ActivitiesController],
//     providers:[]
// })
// export class ActivitiesModule {}
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';  // Prisma service
import { ActivitiesService } from './activities.service';       // Activities service
import { ActivitiesController } from './activities.controller'; // Activities controller

@Module({
  imports: [],  // Any modules required by ActivitiesModule
  controllers: [ActivitiesController],
  providers: [ActivitiesService, PrismaService],  // Include ActivitiesService here
   exports: [ActivitiesService],  // Export ActivitiesService if used in other modules
})
export class ActivitiesModule {}
