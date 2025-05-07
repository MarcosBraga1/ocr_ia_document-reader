import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Message } from '@prisma/client';

@Injectable()
export class MessageService {
    constructor (private readonly prisma: PrismaService) {}

    async createMessage(
        conversationId: number,
        sender: string,
        content: string,
        documentId?: number
    ): Promise<Message> {
        return await this.prisma.message.create({
            data: {
                conversationId: conversationId,
                sender: sender,
                content: content,
                documentId,
            },
            include: {
                document: true,
            }
        });
    }
}
