import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { OcrModule } from './ocr/ocr.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LlmModule } from './llm/llm.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConversationModule,
    MessageModule,
    OcrModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // ← caminho físico no disco
      serveRoot: '/uploads', 
    }),
    LlmModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }  
  ],
})
export class AppModule {}
