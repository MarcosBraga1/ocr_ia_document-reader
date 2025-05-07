import { Controller, Body, HttpCode, HttpStatus, Header, Param, Res, Get, Post, Request, Query } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { MessageService } from 'src/message/message.service';
import { Response } from 'express';

@Controller('conversation')
export class ConversationController {
    constructor(
        private conversationService: ConversationService,
        private messageService: MessageService
    ) { }

    @Get('')
    async getConversations(@Request() req) {
        const user = req.user;
        return await this.conversationService.getConversations(user.username);
    }

    @Get('messages')
    async getMessages(@Query('conversationId') conversationId: string) {
        const id = parseInt(conversationId);
        return this.conversationService.getMessages(id);
    }

    @Get(':id/export')
    async exportConversation(@Param('id') id: string, @Res() res: Response) {
        const conversationId = parseInt(id);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=conversa-${conversationId}.pdf`);

        const doc = await this.conversationService.generateConversationPdf(conversationId);
        doc.pipe(res);
        doc.end();
    }

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    async createConversation(@Request() req) {
        const user = req.user;
        return await this.conversationService.createConversation(user.username);
    }

    @Post('message')
    async createMessage(@Query('conversationId') conversationId: string, @Body() body: { content: string; documentId: number, sender: string }) {
        const id = parseInt(conversationId);
        return await this.messageService.createMessage(id, body.sender, body.content, body.documentId)
    }


}
