// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from './entities/user.entity';
// import { CreateUserDto } from './dto/create-user.dto';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//   ) {}

//   async createUser(createUserDto: CreateUserDto): Promise<User> {
//     const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
//     const user = this.usersRepository.create({ ...createUserDto, password: hashedPassword });
//     return this.usersRepository.save(user);
//   }

//   async findUserByEmail(email: string): Promise<User | undefined> {
//     return this.usersRepository.findOneBy({ email });
//   }
// }


import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';  // Import PrismaService
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';  // Import User type from Prisma Client
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}  // Inject PrismaService

  // Create a new user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create a user using Prisma
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,  // Save the hashed password
      },
    });

    return user;  // Return the created user
  }

  // Find user by email
  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email: email,  // Use Prisma's unique query to find user by email
      },
    });
  }
}

