import { Controller, Post, UploadedFile, UseInterceptors, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OcrService } from './ocr.service';
import { multerConfig } from 'src/config/multer.config';

@Controller('ocr')
export class OcrController {
    constructor (private ocrService: OcrService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', multerConfig))
    async handleUpload(@UploadedFile() file: Express.Multer.File) {
        const ocrText = await this.ocrService.extractText(file);
        return await this.ocrService.saveDocument(file, ocrText); 
    }
}
