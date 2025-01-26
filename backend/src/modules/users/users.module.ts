// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './entities/user.entity' 
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';

// @Module({
//   imports: [TypeOrmModule.forFeature([User])], // Register the User entity with TypeORM
//   providers: [UsersService],
//   controllers: [UsersController],
//   exports: [UsersService], // Export UsersService for other modules
// })
// export class UsersModule {}


import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../../../prisma/prisma.module';  // Import PrismaModule

@Module({
  imports: [PrismaModule],  // Import PrismaModule
  providers: [UsersService],
  exports: [UsersService],  // Export UsersService if needed in other modules
})
export class UsersModule {}
