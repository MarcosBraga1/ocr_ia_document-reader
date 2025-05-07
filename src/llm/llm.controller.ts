import { Controller, Post, Body } from '@nestjs/common';
import { LlmService } from './llm.service';

@Controller('llm')
export class LlmController {
    constructor (private llmService: LlmService) {}

    @Post('prompt')
    async generateResponse(@Body() promptDto: Record<string, any>) {
        return await this.llmService.generateResponse(promptDto.text, promptDto.context);
    }
}
