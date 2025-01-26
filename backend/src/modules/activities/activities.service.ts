import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  async create(createActivityDto: CreateActivityDto) {
    // Check if the user exists before creating an activity
    const userExists = await this.prisma.user.findUnique({
      where: { id: createActivityDto.userId },
    });

    if (!userExists) {
      throw new Error('User not found');
    }

    // Map CreateActivityDto to Prisma input format
    const activityData = {
      title: createActivityDto.title,
      description: createActivityDto.description,
      type: createActivityDto.type,
      userId: createActivityDto.userId,
      date: createActivityDto.date || new Date(), // Default to current date if not provided
    };

    return await this.prisma.activity.create({
      data: activityData, // Use the mapped data here
    });
  }

  async findAll() {
    return await this.prisma.activity.findMany();
  }
  async findOne(id:number) {
    return await this.prisma.activity.findUnique({
        where:{id}
    });
  }
}
