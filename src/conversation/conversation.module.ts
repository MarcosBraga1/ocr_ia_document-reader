import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { PrismaService } from 'src/prisma.service';
import { MessageService } from 'src/message/message.service';

@Module({
  controllers: [ConversationController],
  providers: [ConversationService, PrismaService, MessageService],
  exports: [PrismaService, MessageService]
})
export class ConversationModule {}
