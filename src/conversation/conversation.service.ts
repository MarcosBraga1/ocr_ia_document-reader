import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Conversation } from '@prisma/client';
import { Prisma } from '@prisma/client';
import * as fs from 'fs';
import type { PDFDocument } from 'pdfkit';
const PDFDocument = require('pdfkit');

@Injectable()
export class ConversationService {
    constructor(private readonly prisma: PrismaService) { }

    async getConversations(
        username: string
    ): Promise<Conversation[]> {
        return this.prisma.conversation.findMany({
            where: {
                user: {
                    username: username,
                }
            },
            orderBy: {
                updatedAt: 'desc',
            }
        });
    }

    async createConversation(
        username: string
    ): Promise<{ conversationId: number }> {
        const conversation = await this.prisma.conversation.create({
            data: {
                user: {
                    connect: {
                        username: username
                    }
                },
                name: 'Nova conversa'

            }
        });

        return {
            conversationId: conversation.id
        }
    }

    async getMessages(
        conversationId: number
    ): Promise<Prisma.MessageGetPayload<{ include: { document: true } }>[]> {
        return this.prisma.message.findMany({
            where: {
                conversationId: conversationId
            },
            orderBy: {
                timeStamp: 'asc'
            },
            include: {
                document: true,
            }
        });
    }

    async generateConversationPdf(conversationId: number): Promise<PDFDocument> {
        const messages = await this.getMessages(conversationId);
        const doc = new PDFDocument();

        doc.fontSize(18).text(`Conversa #${conversationId}`, { align: 'center' });
        doc.moveDown();

        for (const msg of messages) {
            doc.fontSize(12).text(`[${msg.sender}]`, { continued: true }).font('Helvetica-Bold').text(` ${msg.content}`);

            if (msg.document?.fileUrl) {
                const imagePath = msg.document.fileUrl.replace(/\\/g, '/');
                if (fs.existsSync(imagePath)) {
                    doc.moveDown();
                    doc.image(imagePath, {
                        fit: [400, 300],
                        align: 'center',
                    });
                }
            }

            doc.moveDown();
        }

        return doc;
    }
}
