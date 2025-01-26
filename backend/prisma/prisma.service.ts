// src/prisma/prisma.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Extending PrismaClient to make it injectable as a service
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }
}
