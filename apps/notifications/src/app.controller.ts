import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { PrismaService } from '~/services/prisma.service';
import { CreateNotificationBody } from '~/create-notification-body';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getNotifications() {
    return this.prisma.notification.findMany();
  }

  @Post()
  async createNotifications(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId
      }
    });
  }
}
