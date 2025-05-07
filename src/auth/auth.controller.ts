import { Res, Body, Controller, Post, HttpCode, HttpStatus, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('signin')
    async signIn(@Body() signInDto: Record<string, any>, @Res({ passthrough: true }) res: Response) {
        const { access_token } = await this.authService.signIn(signInDto.username, signInDto.password);
        res.cookie('token', access_token, {
            httpOnly: true,
            secure: true, // CHANGE FOR TRUE
            sameSite: 'none',
            maxAge: 1000 * 60 * 60,  // 1 hora
            domain: '.onrender.com'
        });
        return { success: true };
    }

    @HttpCode(HttpStatus.CREATED)
    @Public()
    @Post('signup')
    async signUp(@Body() signUpDto: Record<string, any>, @Res({ passthrough: true }) res: Response) {
        const { access_token } = await this.authService.signUp(signUpDto.name, signUpDto.username, signUpDto.email, signUpDto.password);
        res.cookie('token', access_token, {
            httpOnly: true,
            secure: true, // CHANGE FOR TRUE
            sameSite: 'none',
            maxAge: 1000 * 60 * 60, // 1 hora
            domain: '.onrender.com'
        });
        return { success: true };
    }

    @Get('profile')
    getProfile(@Request() req) {
        return {
            userId: req.user.sub,
            username: req.user.username
        };
    }
}
