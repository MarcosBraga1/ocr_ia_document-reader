import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from "@google/genai";

@Injectable()
export class LlmService {
    private ai: GoogleGenAI;

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('GOOGLE_API_KEY');
        this.ai = new GoogleGenAI({ apiKey });
    }

    async generateResponse(
        text: string,
        context: string
    ): Promise<{ res: string }> {
        const response = await this.ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: text,
            config: {
                systemInstruction: `Você interpreta o seguinte texto: ${context}`
            }
        });
        return { res: response.text ?? 'no response from Gemini' }
    }
}
