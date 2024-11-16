import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { comparePassword } from 'hashing.util';
import { User } from 'src/user/entities/user.entity';
import { User as UserType } from 'src/common/types/user.type';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LoginService {
  constructor(
    private readonly prismaClient: PrismaClient,
    private jwtService: JwtService,
  ) {}

  async login(emailOrUsername: string, password: string): Promise<{token: string, user: User}> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });

    if (!user) {
      throw new NotFoundException(
        `User with email ${emailOrUsername} or username ${emailOrUsername} not found`,
      );
    }

    if (!(await comparePassword(password, user.password))) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload: UserType = { id: user.id, email: user.email };
    return {
		token: await this.jwtService.signAsync(payload),
		user: plainToInstance(User, user)
	}
  }
}
