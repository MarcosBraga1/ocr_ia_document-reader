import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OcrService {
  constructor(private prisma: PrismaService) {}

  async extractText(file: Express.Multer.File): Promise<string> {
    const { data } = await Tesseract.recognize(file.path, 'por');
    return data.text;
  }

  async saveDocument(file: Express.Multer.File, ocrText: string) {
    return this.prisma.document.create({
      data: {
        title: file.originalname,
        fileUrl: file.path,
        contentType: file.mimetype,
        ocrText: ocrText,
      },
    });
  }
}
