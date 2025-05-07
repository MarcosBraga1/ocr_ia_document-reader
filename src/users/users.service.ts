import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export type User = any;

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}
    
    async findOne(username: string): Promise<User | undefined> {
        return this.prisma.user.findUnique({ where: {username} });
    }

    async create(name: string, username: string, email: string, password: string): Promise<User | undefined> {
        return this.prisma.user.create({
            data: {
                name,
                username,
                email,
                password: password,
            }
        });
    }
}
