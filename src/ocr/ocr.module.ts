import { Module } from '@nestjs/common';
import { OcrController } from './ocr.controller';
import { OcrService } from './ocr.service';
import { PrismaService } from 'src/prisma.service';
import { MessageService } from 'src/message/message.service';

@Module({
  controllers: [OcrController],
  providers: [OcrService, PrismaService],
  exports: [PrismaService]
})
export class OcrModule {}
