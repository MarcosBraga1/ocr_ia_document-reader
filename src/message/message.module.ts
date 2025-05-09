import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [MessageService, PrismaService],
  exports: [PrismaService]
})
export class MessageModule {}
