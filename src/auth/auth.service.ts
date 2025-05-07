
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(
        username: string,
        password: string,
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.findOne(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.userId, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(
        name: string,
        username: string,
        email: string,
        password: string,
    ): Promise<{ access_token: string }> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.usersService.create(name, username, email, hashedPassword);
        const payload = { sub: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }
}
